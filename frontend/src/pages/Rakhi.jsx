import React, { useState, useEffect } from 'react';
import { IndianRupee, ChevronLeft, ChevronRight, Loader2, Package, AlertCircle, X, Edit, Trash2, Save, Upload, FileText, Tag, ImageIcon, CheckCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from "../api/product";

function Rakhi() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState('');
  import { useNavigate } from 'react-router-dom';
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    price: '',
    tag: '',
    image: null
  });
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const productsPerPage = 8;

  const navigate = useNavigate();
  
  // Get user from Redux store
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    fetchRakhiProducts();
  }, []);

  const fetchRakhiProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/tag/rakhi');
      
      setProducts(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching rakhi products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      setActionLoading(productId);
      const response = await axios.delete(`/${productId}`);
      
      if(response.status !== 200) {
        throw new Error('Failed to delete product');
      }
      
      // Remove product from state
      setProducts(products.filter(p => p._id !== productId));
      setMessage({ type: 'success', text: 'Product deleted successfully!' });
      setDeleteConfirmId(null);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);

      navigate('/');
      
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ type: 'error', text: 'Failed to delete product.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } finally {
      setActionLoading('');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditForm({
      title: product.title,
      description: product.description || '',
      price: product.price,
      tag: product.tag,
      image: null
    });
    setEditImagePreview(product.imageUrl);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setEditImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeEditImage = () => {
    setEditForm(prev => ({
      ...prev,
      image: null
    }));
    setEditImagePreview(null);
  };

  const handleEditSubmit = async (productId) => {
    try {
      setActionLoading(productId);
      
      const submitData = new FormData();
      submitData.append('title', editForm.title);
      submitData.append('description', editForm.description);
      submitData.append('price', editForm.price);
      submitData.append('tag', editForm.tag);
      if (editForm.image) {
        submitData.append('image', editForm.image);
      }

      const response = await axios.put(`/update/${productId}`, submitData);

      const updatedProduct = response.data;
      
      // Update product in state
      setProducts(products.map(p => 
        p._id === productId ? updatedProduct.product : p
      ));
      
      setMessage({ type: 'success', text: 'Product updated successfully!' });
      setEditingProduct(null);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage({ type: 'error', text: 'Failed to update product.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } finally {
      setActionLoading('');
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditForm({
      title: '',
      description: '',
      price: '',
      tag: '',
      image: null
    });
    setEditImagePreview(null);
  };

  const openImageModal = (product) => {
    if (editingProduct !== product._id) {
      setSelectedImage(product);
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading Rakhi Collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-red-100">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchRakhiProducts}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🪔 Rakhi Collection
          </h1>
          <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto">
            Discover our beautiful collection of traditional and modern rakhis to celebrate the bond of love
          </p>
          <div className="mt-6 text-white/90">
            <span className="inline-flex items-center gap-2">
              <Package className="w-5 h-5" />
              {products.length} Products Available
            </span>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message.text && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Rakhis Found</h3>
            <p className="text-gray-500">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-100 hover:border-orange-200"
                >
                  {editingProduct === product._id ? (
                    // Edit Form
                    <div className="p-6">
                      <div className="space-y-4">
                        {/* Title Input */}
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FileText className="w-4 h-4" />
                            Title *
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={editForm.title}
                            onChange={handleEditInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          />
                        </div>

                        {/* Description Input */}
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FileText className="w-4 h-4" />
                            Description
                          </label>
                          <textarea
                            name="description"
                            value={editForm.description}
                            onChange={handleEditInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none"
                          />
                        </div>

                        {/* Price and Tag */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                              <IndianRupee className="w-4 h-4" />
                              Price *
                            </label>
                            <input
                              type="number"
                              name="price"
                              value={editForm.price}
                              onChange={handleEditInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                              <Tag className="w-4 h-4" />
                              Tag *
                            </label>
                            <select
                              name="tag"
                              value={editForm.tag}
                              onChange={handleEditInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white"
                            >
                              <option value="rakhi">Rakhi</option>
                              <option value="Vastra">Vastra</option>
                            </select>
                          </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <ImageIcon className="w-4 h-4" />
                            Image
                          </label>
                          {!editImagePreview ? (
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleEditImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-200">
                                <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                                <p className="text-xs text-gray-600">Click to upload</p>
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
                              <img
                                src={editImagePreview}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded-lg border border-gray-300"
                              />
                              <button
                                type="button"
                                onClick={removeEditImage}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleEditSubmit(product._id)}
                            disabled={actionLoading === product._id}
                            className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
                          >
                            {actionLoading === product._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Normal Product Display
                    <>
                      {/* Product Image */}
                      <div className="relative overflow-hidden bg-gray-100 h-64">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                            onClick={() => openImageModal(product)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                            <Package className="w-16 h-16 text-orange-400" />
                          </div>
                        )}

                        {/* Admin Actions Overlay */}
                        {isAdmin && (
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(product._id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                          {product.title}
                        </h3>
                        
                        {product.description && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1 text-2xl font-bold text-gray-800">
                            <IndianRupee className="w-5 h-5" />
                            {product.price.toLocaleString('en-IN')}
                          </div>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                            Rakhi
                          </span>
                        </div>

                        {/* Action Button */}
                        <button 
                          onClick={() => openImageModal(product)}
                          className="w-full px-4 py-3 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg flex items-center justify-center ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                  } transition-colors duration-200`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = 
                      number === 1 ||
                      number === totalPages ||
                      (number >= currentPage - 1 && number <= currentPage + 1);

                    if (!showPage) {
                      // Show ellipsis
                      if (number === currentPage - 2 || number === currentPage + 2) {
                        return (
                          <span key={number} className="px-3 py-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          currentPage === number
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                        }`}
                      >
                        {number}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg flex items-center justify-center ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                  } transition-colors duration-200`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Page Info */}
            <div className="text-center mt-6 text-gray-600">
              Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, products.length)} of {products.length} products
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Product</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  disabled={actionLoading === deleteConfirmId}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {actionLoading === deleteConfirmId ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full p-2 transition-all duration-200 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Modal Content */}
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="flex-1 bg-gray-100">
                {selectedImage.imageUrl ? (
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full h-96 md:h-[500px] object-cover"
                  />
                ) : (
                  <div className="w-full h-96 md:h-[500px] flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                    <Package className="w-24 h-24 text-orange-400" />
                  </div>
                )}
              </div>
              
              {/* Product Details Section */}
              <div className="md:w-80 p-6 bg-white">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {selectedImage.title}
                </h2>
                
                {selectedImage.description && (
                  <p className="text-gray-600 mb-4">
                    {selectedImage.description}
                  </p>
                )}
                
                <div className="flex items-center gap-1 text-3xl font-bold text-gray-800 mb-4">
                  <IndianRupee className="w-6 h-6" />
                  {selectedImage.price.toLocaleString('en-IN')}
                </div>
                
                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium text-sm mb-6">
                  Rakhi
                </span>
                
                <button
                  onClick={closeImageModal}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rakhi;
