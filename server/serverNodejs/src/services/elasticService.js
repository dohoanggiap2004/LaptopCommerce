const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');

const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'jdPProJm+Tb5FcJ6eamB'
    }
});

const indexLaptop = async (laptop) => {
    await client.index({
        index: 'laptops',
        id: laptop.id,
        body: {
            model: laptop.model,
            cpu: laptop.cpu,
            vga: laptop.vga,
            description: laptop.description,
            price: laptop.price,
            specialPrice: laptop.specialPrice,
            image: laptop.image,
            laptopId: laptop.laptopId
        },
    });
    await client.indices.refresh({ index: 'laptops' });
};

const searchSimilarLaptops = async (queryVector) => {
    const cleanedQuery = queryVector.replace(/undefined/g, '').trim();
    const result = await client.search({
        index: 'laptops',
        size: 10,
        query: {
            multi_match: {
                query: cleanedQuery,
                fields: ["cpu", "vga", "description", "model"],
                type: "most_fields"  // Tính toán điểm cho tất cả các trường và cộng lại
            }
        }
    });
    return result.hits.hits;
};

module.exports = { indexLaptop, searchSimilarLaptops };
