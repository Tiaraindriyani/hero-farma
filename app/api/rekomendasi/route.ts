
import { NextResponse } from "next/server";
import { TfIdf, WordTokenizer } from "natural";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  const { keluhan, kategori, durasi, riwayatPenyakit } = await request.json();

  const snapshot = await getDocs(collection(db, "obat"));
  const dataObat = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  }));

  const tfidf = new TfIdf();
  const tokenizer = new WordTokenizer();

  const semuaDokumen: string[] = [];
  dataObat.forEach((obat) => {
    const deskripsi = `${obat.namaObat} ${obat.kategoriObat} ${obat.indikasiObat} ${obat.efekSamping} ${obat.bentukObat} ${obat.deskripsiObat}`;
    semuaDokumen.push(deskripsi.toLowerCase());
    tfidf.addDocument(deskripsi.toLowerCase());
  });

  const query =
    `${keluhan} ${kategori} ${durasi} ${riwayatPenyakit}`.toLowerCase();
  const queryTokens = tokenizer.tokenize(query);

  const semuaTerm: string[] = [];
  tfidf.documents.forEach((doc, i) => {
    tfidf.listTerms(i).forEach((term) => {
      if (!semuaTerm.includes(term.term)) semuaTerm.push(term.term);
    });
  });

  const queryVector = semuaTerm.map((term) =>
    queryTokens.includes(term) ? tfidf.idf(term) : 0
  );

  const hasil = dataObat.map((obat, index) => {
    const docTerms = tfidf.listTerms(index);
    const docVector = semuaTerm.map((term) => {
      const item = docTerms.find((t) => t.term === term);
      return item ? item.tfidf : 0;
    });

    const dotProduct = queryVector.reduce(
      (sum, val, i) => sum + val * docVector[i],
      0
    );
    const magnitudeA = Math.sqrt(
      queryVector.reduce((sum, val) => sum + val * val, 0)
    );
    const magnitudeB = Math.sqrt(
      docVector.reduce((sum, val) => sum + val * val, 0)
    );
    const similarity =
      magnitudeA === 0 || magnitudeB === 0
        ? 0
        : dotProduct / (magnitudeA * magnitudeB);

    return { ...obat, similarity };
  });

  const sorted = hasil.sort((a, b) => b.similarity - a.similarity);
  return NextResponse.json(sorted.slice(0, 5));
}