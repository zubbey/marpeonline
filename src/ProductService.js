import axios from 'axios';
const url = 'http://localhost:5000/api/products/';

class productService{

    // GET ALL PRODUCTS
    static getProducts(){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(product => ({
                        ...product,
                        created: new Date(product.created)
                    }))
                );
            } catch (error) {
                reject(error);
            }
        });
    }
    // GET ALL SPECIFIC PRODUCT


}

export default productService;