// app/api/rekomendasi/route.ts
import { NextResponse } from "next/server";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    const { nama, usia, indikasi, durasi, riwayatPenyakit } = await request.json();

    if (!indikasi) {
      return NextResponse.json({ error: "Indikasi wajib diisi." }, { status: 400 });
    }

    const snapshot = await getDocs(collection(db, "obat"));
    const dataObat = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));

    const tokenize = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    const query = `${indikasi} ${riwayatPenyakit}`;
    const queryTokens = tokenize(query);

    const dokumenList = dataObat.map((obat) => {
      const combinedText = `${obat.namaObat || ""} ${obat.indikasiObat || ""} ${obat.efekSamping || ""} ${obat.bentukObat || ""} ${obat.deskripsiObat || ""}`;
      return tokenize(combinedText);
    });

    const semuaTerm: string[] = [];
    dokumenList.forEach((tokens) => {
      tokens.forEach((term) => {
        if (!semuaTerm.includes(term)) semuaTerm.push(term);
      });
    });

    const df: Record<string, number> = {};
    semuaTerm.forEach((term) => {
      df[term] = dokumenList.filter((tokens) => tokens.includes(term)).length;
    });

    const idf: Record<string, number> = {};
    semuaTerm.forEach((term) => {
      idf[term] = Math.log(dataObat.length / (df[term] || 1));
    });

    const tfidfDocs = dokumenList.map((tokens) => {
      const tf: Record<string, number> = {};
      tokens.forEach((term) => {
        tf[term] = (tf[term] || 0) + 1;
      });
      const totalTerms = tokens.length;
      return semuaTerm.map((term) => ((tf[term] || 0) / totalTerms) * (idf[term] || 0));
    });

    const tfQuery: Record<string, number> = {};
    queryTokens.forEach((term) => {
      tfQuery[term] = (tfQuery[term] || 0) + 1;
    });
    const totalQueryTerms = queryTokens.length;
    const queryVector = semuaTerm.map(
      (term) => ((tfQuery[term] || 0) / totalQueryTerms) * (idf[term] || 0)
    );

    const hasil = tfidfDocs.map((docVector, index) => {
      const dotProduct = docVector.reduce((sum, val, i) => sum + val * queryVector[i], 0);
      const magnitudeDoc = Math.sqrt(docVector.reduce((sum, val) => sum + val * val, 0));
      const magnitudeQuery = Math.sqrt(queryVector.reduce((sum, val) => sum + val * val, 0));
      const similarity =
        magnitudeDoc && magnitudeQuery ? dotProduct / (magnitudeDoc * magnitudeQuery) : 0;

      return { ...dataObat[index], similarity };
    });

    const sorted = hasil.sort((a, b) => b.similarity - a.similarity);
    const top3 = sorted.filter((o) => o.similarity > 0).slice(0, 3);

    await addDoc(collection(db, "history"), {
      nama,
      usia,
      indikasi,
      durasi,
      riwayatPenyakit,
      rekomendasiObat: top3.map((obat) => ({
        namaObat: obat.namaObat || "-",
        similarity: parseFloat(obat.similarity.toFixed(4)),
      })),
      dateCreated: new Date().toISOString(),
    });

    return NextResponse.json(top3);
  } catch (error) {
    console.error("Error rekomendasi:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}
