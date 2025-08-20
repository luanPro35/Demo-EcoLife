import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuthContext } from './AuthContext';

// Giả lập dữ liệu sản phẩm
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Túi tái chế từ vải bố',
    description: 'Túi tái chế thân thiện với môi trường, làm từ vải bố 100% tự nhiên',
    price: 150000,
    image: 'https://via.placeholder.com/300x300?text=Eco+Bag',
    category: 'bags',
    tags: ['eco-friendly', 'handmade'],
    rating: 4.5,
    stock: 50,
    createdAt: '2023-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Bình nước thủy tinh',
    description: 'Bình nước thủy tinh tái sử dụng, thay thế chai nhựa dùng một lần',
    price: 220000,
    image: 'https://via.placeholder.com/300x300?text=Glass+Bottle',
    category: 'bottles',
    tags: ['eco-friendly', 'reusable'],
    rating: 4.8,
    stock: 30,
    createdAt: '2023-02-10T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Ống hút tre tự nhiên',
    description: 'Ống hút làm từ tre tự nhiên, có thể tái sử dụng và phân hủy sinh học',
    price: 50000,
    image: 'https://via.placeholder.com/300x300?text=Bamboo+Straws',
    category: 'kitchen',
    tags: ['eco-friendly', 'biodegradable'],
    rating: 4.2,
    stock: 100,
    createdAt: '2023-03-05T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Xà phòng hữu cơ',
    description: 'Xà phòng làm từ nguyên liệu hữu cơ, không hóa chất độc hại',
    price: 85000,
    image: 'https://via.placeholder.com/300x300?text=Organic+Soap',
    category: 'personal-care',
    tags: ['organic', 'chemical-free'],
    rating: 4.7,
    stock: 45,
    createdAt: '2023-04-20T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Bàn chải tre',
    description: 'Bàn chải đánh răng làm từ tre, thân thiện với môi trường',
    price: 35000,
    image: 'https://via.placeholder.com/300x300?text=Bamboo+Toothbrush',
    category: 'personal-care',
    tags: ['eco-friendly', 'biodegradable'],
    rating: 4.3,
    stock: 80,
    createdAt: '2023-05-15T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Hộp cơm tre',
    description: 'Hộp đựng cơm làm từ tre, thay thế hộp nhựa dùng một lần',
    price: 180000,
    image: 'https://via.placeholder.com/300x300?text=Bamboo+Lunchbox',
    category: 'kitchen',
    tags: ['eco-friendly', 'reusable'],
    rating: 4.6,
    stock: 25,
    createdAt: '2023-06-10T00:00:00.000Z'
  },
  {
    id: '7',
    name: 'Túi lưới đi chợ',
    description: 'Túi lưới đi chợ có thể tái sử dụng nhiều lần, thay thế túi nilon',
    price: 65000,
    image: 'https://via.placeholder.com/300x300?text=Mesh+Bag',
    category: 'bags',
    tags: ['eco-friendly', 'reusable'],
    rating: 4.4,
    stock: 60,
    createdAt: '2023-07-05T00:00:00.000Z'
  },
  {
    id: '8',
    name: 'Sáp ong bọc thực phẩm',
    description: 'Sáp ong bọc thực phẩm thay thế màng bọc nhựa, có thể tái sử dụng',
    price: 120000,
    image: 'https://via.placeholder.com/300x300?text=Beeswax+Wrap',
    category: 'kitchen',
    tags: ['eco-friendly', 'reusable'],
    rating: 4.9,
    stock: 40,
    createdAt: '2023-08-20T00:00:00.000Z'
  }
];

// Danh sách các danh mục sản phẩm
const CATEGORIES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'bags', name: 'Túi & Balo' },
  { id: 'bottles', name: 'Bình nước' },
  { id: 'kitchen', name: 'Nhà bếp' },
  { id: 'personal-care', name: 'Chăm sóc cá nhân' }
];

// Tạo context
const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Các tham số tìm kiếm và lọc
  const [searchParams, setSearchParams] = useState({
    query: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
    tags: [],
    rating: 0,
    page: 1,
    limit: 12
  });

  // Lấy dữ liệu sản phẩm
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Trong thực tế, đây sẽ là API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      // const data = await response.json();
      // setProducts(data);
      
      setProducts(MOCK_PRODUCTS);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Không thể tải sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy sản phẩm theo ID
  const getProductById = useCallback((productId) => {
    return products.find(product => product.id === productId) || null;
  }, [products]);

  // Lấy sản phẩm theo danh mục
  const getProductsByCategory = useCallback((categoryId) => {
    if (categoryId === 'all') return products;
    return products.filter(product => product.category === categoryId);
  }, [products]);

  // Tìm kiếm sản phẩm
  const searchProducts = useCallback((query) => {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [products]);

  // Lọc sản phẩm theo nhiều tiêu chí
  const filterProducts = useCallback(() => {
    let result = [...products];
    
    // Lọc theo từ khóa tìm kiếm
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Lọc theo danh mục
    if (searchParams.category !== 'all') {
      result = result.filter(product => product.category === searchParams.category);
    }
    
    // Lọc theo giá
    if (searchParams.minPrice) {
      result = result.filter(product => product.price >= Number(searchParams.minPrice));
    }
    
    if (searchParams.maxPrice) {
      result = result.filter(product => product.price <= Number(searchParams.maxPrice));
    }
    
    // Lọc theo tags
    if (searchParams.tags && searchParams.tags.length > 0) {
      result = result.filter(product => 
        searchParams.tags.some(tag => product.tags.includes(tag))
      );
    }
    
    // Lọc theo đánh giá
    if (searchParams.rating > 0) {
      result = result.filter(product => product.rating >= searchParams.rating);
    }
    
    // Sắp xếp
    switch (searchParams.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    
    setFilteredProducts(result);
    return result;
  }, [products, searchParams]);

  // Cập nhật tham số tìm kiếm
  const updateSearchParams = useCallback((newParams) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams,
      // Reset về trang 1 khi thay đổi các tham số tìm kiếm
      page: newParams.hasOwnProperty('page') ? newParams.page : 1
    }));
  }, []);

  // Lấy tất cả tags từ sản phẩm
  const getAllTags = useCallback(() => {
    const allTags = products.reduce((tags, product) => {
      product.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      return tags;
    }, []);
    
    return allTags;
  }, [products]);

  // Phân trang
  const getPaginatedProducts = useCallback(() => {
    const { page, limit } = searchParams;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, searchParams]);

  // Lấy tổng số trang
  const getTotalPages = useCallback(() => {
    return Math.ceil(filteredProducts.length / searchParams.limit);
  }, [filteredProducts, searchParams.limit]);

  // Reset bộ lọc
  const resetFilters = useCallback(() => {
    setSearchParams({
      query: '',
      category: 'all',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest',
      tags: [],
      rating: 0,
      page: 1,
      limit: 12
    });
  }, []);

  // Tải dữ liệu sản phẩm khi component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Lọc sản phẩm khi tham số tìm kiếm thay đổi
  useEffect(() => {
    filterProducts();
  }, [filterProducts, searchParams]);

  // Lưu lịch sử tìm kiếm
  const saveSearchHistory = useCallback((query) => {
    if (!user || !query) return;
    
    try {
      // Lấy lịch sử tìm kiếm hiện tại
      const searchHistoryKey = `search_history_${user.uid}`;
      const savedHistory = localStorage.getItem(searchHistoryKey);
      let searchHistory = savedHistory ? JSON.parse(savedHistory) : [];
      
      // Kiểm tra nếu query đã tồn tại
      const existingIndex = searchHistory.findIndex(item => item.query === query);
      
      if (existingIndex !== -1) {
        // Nếu đã tồn tại, cập nhật thời gian tìm kiếm
        searchHistory[existingIndex].timestamp = new Date().toISOString();
      } else {
        // Nếu chưa tồn tại, thêm mới
        searchHistory.push({
          query,
          timestamp: new Date().toISOString()
        });
      }
      
      // Giới hạn lịch sử tìm kiếm (giữ 10 kết quả mới nhất)
      searchHistory = searchHistory
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
      
      // Lưu lịch sử tìm kiếm
      localStorage.setItem(searchHistoryKey, JSON.stringify(searchHistory));
    } catch (err) {
      console.error('Error saving search history:', err);
    }
  }, [user]);

  // Lấy lịch sử tìm kiếm
  const getSearchHistory = useCallback(() => {
    if (!user) return [];
    
    try {
      const searchHistoryKey = `search_history_${user.uid}`;
      const savedHistory = localStorage.getItem(searchHistoryKey);
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (err) {
      console.error('Error getting search history:', err);
      return [];
    }
  }, [user]);

  // Xóa lịch sử tìm kiếm
  const clearSearchHistory = useCallback(() => {
    if (!user) return;
    
    try {
      localStorage.removeItem(`search_history_${user.uid}`);
    } catch (err) {
      console.error('Error clearing search history:', err);
    }
  }, [user]);

  const value = {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    searchParams,
    fetchProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    filterProducts,
    updateSearchParams,
    getAllTags,
    getPaginatedProducts,
    getTotalPages,
    resetFilters,
    saveSearchHistory,
    getSearchHistory,
    clearSearchHistory
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};