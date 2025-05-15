/**
 * Menghitung vektor TF-IDF dari query dan dokumen
 * @param query string - teks query
 * @param docs string[] - daftar dokumen untuk dibandingkan
 * @returns [number[], number[][]] - vektor TF-IDF untuk query dan semua dokumen
 */
export function tfidfVectorize(
  query: string,
  docs: string[]
): [number[], number[][]] {
  const allDocs = [query, ...docs];
  const terms = new Set<string>();

  // Tokenisasi dan kumpulkan semua kata unik dari seluruh dokumen
  allDocs.forEach((doc) => {
    doc
      .toLowerCase()
      .split(/\W+/)
      .forEach((word) => {
        if (word) terms.add(word);
      });
  });

  const vocab = Array.from(terms);

  // Hitung TF (Term Frequency)
  const tf = allDocs.map((doc) => {
    const words = doc.toLowerCase().split(/\W+/);
    return vocab.map((term) => {
      const termCount = words.filter((w) => w === term).length;
      return words.length > 0 ? termCount / words.length : 0;
    });
  });

  // Hitung DF (Document Frequency)
  const df = vocab.map((_, idx) =>
    tf.reduce((count, vec) => count + (vec[idx] > 0 ? 1 : 0), 0)
  );

  // Hitung IDF (Inverse Document Frequency)
  const idf = df.map((d) => Math.log(allDocs.length / (d || 1)));

  // Hitung TF-IDF
  const tfidf = tf.map((vec) => vec.map((tfval, i) => tfval * idf[i]));

  // Kembalikan [queryVector, dokumenVectors]
  return [tfidf[0], tfidf.slice(1)];
}

/**
 * Menghitung cosine similarity antara dua vektor
 * @param a number[] - vektor A
 * @param b number[] - vektor B
 * @returns number - nilai cosine similarity antara 0 hingga 1
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  const similarity = magA && magB ? dot / (magA * magB) : 0;

  return Math.min(Math.max(similarity, 0), 1);
}