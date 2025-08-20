import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const Login = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                Tên hiển thị
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input-field w-full"
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full"
              required
            />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <button 
            onClick={toggleMode} 
            className="text-primary hover:underline"
          >
            {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
          </button>
        </div>
        
        <div className="mt-4 text-right">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;