// useProduct.js
import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';

export function useGetProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { products, loading };
}

export function useCreateProduct() {
    const create = async (productData) => {
        try {
            const data = await createProduct(productData);
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { create };
}

export function useUpdateProduct() {
    const update = async (productId, productData) => {
        try {
            const data = await updateProduct(productId, productData);
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { update };
}

export function useDeleteProduct() {
    const remove = async (productId) => {
        try {
            const data = await deleteProduct(productId);
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { remove };
}
