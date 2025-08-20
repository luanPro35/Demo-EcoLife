import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuthContext();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await updateUserProfile({ displayName, photoURL });
      setMessage('Cập nhật thông tin thành công');
    } catch (err) {
      setError('Không thể cập nhật thông tin: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-gray-400">{user?.displayName?.charAt(0) || user?.email?.charAt(0)}</span>
              )}
            </div>
            <h3 className="text-xl font-medium">{user?.displayName || 'Người dùng'}</h3>
            <p className="text-gray-500">{user?.email}</p>
            
            <div className="mt-6 space-y-2 w-full">
              <Link to="/change-password" className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Đổi mật khẩu
              </Link>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>}
          
          {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">URL ảnh đại diện</label>
              <input
                id="photoURL"
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : 'Cập nhật thông tin'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;