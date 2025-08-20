/**
 * Service để xử lý các API liên quan đến sản phẩm
 */

// Giả lập dữ liệu sản phẩm (trong thực tế sẽ được thay thế bằng API calls)
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
  // Các sản phẩm khác đã được định nghĩa trong ProductContext
];

/**
 * Lấy tất cả sản phẩm
 * @param {Object} params - Các tham số tìm kiếm và lọc
 * @returns {Promise} - Promise chứa danh sách sản phẩm
 */
export const getAllProducts = async (params = {}) => {
  try {
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Trong thực tế, đây sẽ là API call
    // const queryParams = new URLSearchParams(params).toString();
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?${queryParams}`);
    // return await response.json();
    
    // Trả về dữ liệu giả lập
    return MOCK_PRODUCTS;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Không thể tải sản phẩm. Vui lòng thử lại.');
  }
};

/**
 * Lấy sản phẩm theo ID
 * @param {string} productId - ID của sản phẩm
 * @returns {Promise} - Promise chứa thông tin sản phẩm
 */
export const getProductById = async (productId) => {
  try {
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Trong thực tế, đây sẽ là API call
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
    // return await response.json();
    
    // Trả về dữ liệu giả lập
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) {
      throw new Error('Không tìm thấy sản phẩm');
    }
    return product;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

/**
 * Lấy sản phẩm theo danh mục
 * @param {string} categoryId - ID của danh mục
 * @returns {Promise} - Promise chứa danh sách sản phẩm
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Trong thực tế, đây sẽ là API call
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/category/${categoryId}`);
    // return await response.json();
    
    // Trả về dữ liệu giả lập
    if (categoryId === 'all') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(product => product.category === categoryId);
  } catch (error) {
    console.error(`Error fetching products by category ${categoryId}:`, error);
    throw new Error('Không thể tải sản phẩm. Vui lòng thử lại.');
  }
};

/**
 * Tìm kiếm sản phẩm
 * @param {string} query - Từ khóa tìm kiếm
 * @returns {Promise} - Promise chứa danh sách sản phẩm
 */
export const searchProducts = async (query) => {
  try {
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Trong thực tế, đây sẽ là API call
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/search?q=${encodeURIComponent(query)}`);
    // return await response.json();
    
    // Trả về dữ liệu giả lập
    if (!query) return MOCK_PRODUCTS;
    
    const searchTerm = query.toLowerCase();
    return MOCK_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  } catch (error) {
    console.error(`Error searching products with query ${query}:`, error);
    throw new Error('Không thể tìm kiếm sản phẩm. Vui lòng thử lại.');
  }
};

/**
 * Lấy tất cả danh mục sản phẩm
 * @returns {Promise} - Promise chứa danh sách danh mục
 */
export const getAllCategories = async () => {
  try {
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Trong thực tế, đây sẽ là API call
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
    // return await response.json();
    
    // Trả về dữ liệu giả lập
    return [
      { id: 'all', name: 'Tất cả' },
      { id: 'bags', name: 'Túi & Balo' },
      { id: 'bottles', name: 'Bình nước' },
      { id: 'kitchen', name: 'Nhà bếp' },
      { id: 'personal-care', name: 'Chăm sóc cá nhân' }
    ];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Không thể tải danh mục. Vui lòng thử lại.');
  }
};

/**
 * Lấy tất cả tags từ sản phẩm
 * @returns {Promise} - Promise chứa danh sách tags
 */
export const getAllTags = async () => {
  try {
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Trong thực tế, đây sẽ là API call
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/tags`);
    // return await response.json();
    
    // Trả về dữ liệu giả lập
    const allTags = MOCK_PRODUCTS.reduce((tags, product) => {
      product.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      return tags;
    }, []);
    
    return allTags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Không thể tải tags. Vui lòng thử lại.');
  }
};

/**
 * Lưu lịch sử tìm kiếm của người dùng
 * @param {string} userId - ID của người dùng
 * @param {string} query - Từ khóa tìm kiếm
 * @returns {Promise} - Promise chứa kết quả lưu
 */
export const saveSearchHistory = async (userId, query) => {
  try {
    // Trong thực tế, đây sẽ là API call
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/search-history`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ query }),
    // });
    // return await response.json();
    
    // Giả lập lưu vào localStorage
    const searchHistoryKey = `search_history_${userId}`;
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
    
    return { success: true };
  } catch (error) {
    console.error('Error saving search history:', error);
    throw new Error('Không thể lưu lịch sử tìm kiếm. Vui lòng thử lại.');
  }
};

/**
 * Lấy lịch sử tìm kiếm của người dùng
 * @param {string} userId - ID của người dùng
 * @returns {Promise} - Promise chứa lịch sử tìm kiếm
 */
export const getSearchHistory = async (userId) => {
  try {
    // Trong thực tế, đây sẽ là API call
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/search-history`);
    // return await response.json();
    
    // Giả lập lấy từ localStorage
    const searchHistoryKey = `search_history_${userId}`;
    const savedHistory = localStorage.getItem(searchHistoryKey);
    return savedHistory ? JSON.parse(savedHistory) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    throw new Error('Không thể tải lịch sử tìm kiếm. Vui lòng thử lại.');
  }
};

/**
 * Xóa lịch sử tìm kiếm của người dùng
 * @param {string} userId - ID của người dùng
 * @returns {Promise} - Promise chứa kết quả xóa
 */
export const clearSearchHistory = async (userId) => {
  try {
    // Trong thực tế, đây sẽ là API call
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/search-history`, {
    //   method: 'DELETE',
    // });
    // return await response.json();
    
    // Giả lập xóa từ localStorage
    localStorage.removeItem(`search_history_${userId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error clearing search history:', error);
    throw new Error('Không thể xóa lịch sử tìm kiếm. Vui lòng thử lại.');
  }
};