// Tải pipeline thông qua import động
const loadPipeline = async () => {
    const { pipeline } = await import('@xenova/transformers');
    return pipeline;
};

let embedder = null;

// Tải mô hình embedding
(async () => {
    const pipeline = await loadPipeline();
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
})();

// Lấy embedding từ văn bản
const getEmbedding = async (text) => {
    if (!embedder) throw new Error('Embedder not initialized');
    const output = await embedder(text, { pooling: 'mean', normalize: true });
    return output.data;
};

// Tính độ tương đồng cosine
const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
};

module.exports = { getEmbedding, cosineSimilarity };