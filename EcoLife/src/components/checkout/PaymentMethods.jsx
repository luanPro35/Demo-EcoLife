import React from 'react';

const PaymentMethods = ({ onSelect, selected }) => {
  const paymentOptions = [
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng (COD)',
      description: 'Thanh toán bằng tiền mặt khi nhận hàng',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Thanh toán an toàn với PayPal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.384a.64.64 0 0 1 .632-.537h6.013c2.934 0 5.312 1.7 5.312 4.413 0 3.86-3.138 5.879-6.739 5.879H7.866a.642.642 0 0 0-.633.537l-1.29 7.134a.64.64 0 0 1-.632.537h-.235zm7.878-12.43c0-1.342-1.246-2.143-2.571-2.143H9.329a.64.64 0 0 0-.632.537l-.816 4.493a.64.64 0 0 0 .632.537h2.898c1.67 0 3.543-.802 3.543-3.424z" />
        </svg>
      ),
    },
    {
      id: 'stripe',
      name: 'Thẻ tín dụng / Thẻ ghi nợ',
      description: 'Thanh toán bằng thẻ Visa, Mastercard, JCB',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      description: 'Thanh toán nhanh chóng với ví điện tử MoMo',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Phương thức thanh toán</h2>
      
      <div className="space-y-4">
        {paymentOptions.map((option) => (
          <div 
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`border rounded-md p-4 cursor-pointer transition-colors ${selected === option.id ? 'border-primary-600 bg-primary-50' : 'border-gray-300 hover:border-primary-300'}`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 mr-4 text-${selected === option.id ? 'primary' : 'gray'}-600`}>
                {option.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">{option.name}</h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === option.id ? 'border-primary-600' : 'border-gray-300'}`}>
                  {selected === option.id && (
                    <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button
          onClick={() => onSelect(selected)}
          className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;