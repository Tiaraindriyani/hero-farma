import { NextApiRequest, NextApiResponse } from "next";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { keluhan } = req.body;

  // Ambil data dari Firestore
  const snapshot = await getDocs(collection(db, "obat"));
  const obatList = snapshot.docs.map((doc) => doc.data());

  // Proses TF-IDF dan cosine similarity (implementasi disini)
  // Lakukan perhitungan berdasarkan keluhan

  res.status(200).json({ rekomendasi: ["Contoh Obat 1", "Contoh Obat 2"] });
}
