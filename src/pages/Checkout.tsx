import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    deliveryMethod: 'standard'
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    paymentMethod: 'card'
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.name || !shippingForm.email || !shippingForm.address) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentForm.paymentMethod === 'card' && (!paymentForm.cardNumber || !paymentForm.cardExpiry)) {
      alert('Please enter valid credit card details.');
      return;
    }
    setStep(3);
  };

  const handlePlaceOrder = () => {
    // Clear local cart Mock
    localStorage.removeItem('mock_cart');
    alert('Thank you! Your luxury order has been placed.');
    navigate('/');
  };

  return (
    <div className="pt-28 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-center gap-4 mb-12 text-sm font-sans font-medium text-gray-400">
          <button 
            onClick={() => step > 1 && setStep(1)}
            className={`flex items-center gap-2 ${step >= 1 ? 'text-[#1A1F3A] font-bold' : ''}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#1A1F3A] text-white' : 'bg-gray-200'}`}>1</span>
            Shipping
          </button>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <button 
            onClick={() => step > 2 && setStep(2)}
            className={`flex items-center gap-2 ${step >= 2 ? 'text-[#1A1F3A] font-bold' : ''}`}
            disabled={step < 2}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#1A1F3A] text-white' : 'bg-gray-200'}`}>2</span>
            Payment
          </button>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <div className={`flex items-center gap-2 ${step === 3 ? 'text-[#1A1F3A] font-bold' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-[#1A1F3A] text-white' : 'bg-gray-200'}`}>3</span>
            Confirmation
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
          
          {/* STEP 1: SHIPPING FORM */}
          {step === 1 && (
            <form onSubmit={handleShippingSubmit}>
              <h2 className="text-2xl font-serif font-bold text-[#1A1F3A] mb-8 flex items-center gap-3">
                <Truck className="text-[#E8B4A0]" /> Shipping Address
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Recipient Name *</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.name} 
                    onChange={e => setShippingForm({ ...shippingForm, name: e.target.value })}
                    className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={shippingForm.email} 
                    onChange={e => setShippingForm({ ...shippingForm, email: e.target.value })}
                    className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Street Address *</label>
                <input 
                  type="text" 
                  required
                  value={shippingForm.address} 
                  onChange={e => setShippingForm({ ...shippingForm, address: e.target.value })}
                  className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">City *</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.city} 
                    onChange={e => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">ZIP Code *</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.zip} 
                    onChange={e => setShippingForm({ ...shippingForm, zip: e.target.value })}
                    className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                  />
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold text-[#1A1F3A] uppercase tracking-wider mb-4">Delivery Speed</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className={`border p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${shippingForm.deliveryMethod === 'standard' ? 'border-[#1A1F3A] bg-gray-50' : 'border-gray-200'}`}>
                    <div>
                      <div className="font-bold text-sm text-[#1A1F3A]">Standard Delivery</div>
                      <div className="text-xs text-gray-400">3-5 Business Days</div>
                    </div>
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="standard"
                      checked={shippingForm.deliveryMethod === 'standard'}
                      onChange={() => setShippingForm({ ...shippingForm, deliveryMethod: 'standard' })}
                      className="accent-[#1A1F3A]"
                    />
                  </label>
                  <label className={`border p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${shippingForm.deliveryMethod === 'express' ? 'border-[#1A1F3A] bg-gray-50' : 'border-gray-200'}`}>
                    <div>
                      <div className="font-bold text-sm text-[#1A1F3A]">Express Premium</div>
                      <div className="text-xs text-gray-400">1-2 Business Days</div>
                    </div>
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="express"
                      checked={shippingForm.deliveryMethod === 'express'}
                      onChange={() => setShippingForm({ ...shippingForm, deliveryMethod: 'express' })}
                      className="accent-[#1A1F3A]"
                    />
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-[#1A1F3A] hover:bg-[#2D5F5D] text-white font-bold rounded-full shadow-lg transition-colors text-center"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit}>
              <h2 className="text-2xl font-serif font-bold text-[#1A1F3A] mb-8 flex items-center gap-3">
                <CreditCard className="text-[#E8B4A0]" /> Secure Payment
              </h2>

              <div className="mb-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className={`border p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${paymentForm.paymentMethod === 'card' ? 'border-[#1A1F3A] bg-gray-50' : 'border-gray-200'}`}>
                    <span className="font-bold text-sm text-[#1A1F3A]">Credit/Debit Card</span>
                    <input 
                      type="radio" 
                      name="payMethod" 
                      value="card"
                      checked={paymentForm.paymentMethod === 'card'}
                      onChange={() => setPaymentForm({ ...paymentForm, paymentMethod: 'card' })}
                      className="accent-[#1A1F3A]"
                    />
                  </label>
                  <label className={`border p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${paymentForm.paymentMethod === 'transfer' ? 'border-[#1A1F3A] bg-gray-50' : 'border-gray-200'}`}>
                    <span className="font-bold text-sm text-[#1A1F3A]">Bank Escrow Transfer</span>
                    <input 
                      type="radio" 
                      name="payMethod" 
                      value="transfer"
                      checked={paymentForm.paymentMethod === 'transfer'}
                      onChange={() => setPaymentForm({ ...paymentForm, paymentMethod: 'transfer' })}
                      className="accent-[#1A1F3A]"
                    />
                  </label>
                </div>
              </div>

              {paymentForm.paymentMethod === 'card' && (
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Cardholder Name</label>
                    <input 
                      type="text" 
                      value={paymentForm.cardName} 
                      onChange={e => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                      className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="•••• •••• •••• ••••"
                      value={paymentForm.cardNumber} 
                      onChange={e => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                      className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Expiration Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        value={paymentForm.cardExpiry} 
                        onChange={e => setPaymentForm({ ...paymentForm, cardExpiry: e.target.value })}
                        className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CVC / CVV</label>
                      <input 
                        type="text" 
                        placeholder="•••"
                        value={paymentForm.cardCvc} 
                        onChange={e => setPaymentForm({ ...paymentForm, cardCvc: e.target.value })}
                        className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentForm.paymentMethod === 'transfer' && (
                <div className="bg-[#FAF8F5] border border-gray-100 p-6 rounded-2xl mb-8 text-sm text-gray-600">
                  Instructions: Please transfer to account <strong>123-456-7890 (Velvoria Escrow Bank)</strong> and upload confirmation invoice to process orders.
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-4 bg-[#1A1F3A] hover:bg-[#2D5F5D] text-white font-bold rounded-full shadow-lg transition-colors text-center"
              >
                Review Order Details
              </button>
            </form>
          )}

          {/* STEP 3: REVIEW & PLACE ORDER */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#1A1F3A] mb-8 flex items-center gap-3">
                <CheckCircle2 className="text-green-600" /> Review Order
              </h2>

              <div className="space-y-6 mb-10 text-sm border-b border-gray-100 pb-6">
                <div>
                  <h4 className="font-bold text-gray-500 mb-1">Shipping Recipient</h4>
                  <p className="text-[#1A1F3A] font-medium">{shippingForm.name} ({shippingForm.email})</p>
                  <p className="text-gray-500">{shippingForm.address}, {shippingForm.city}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-500 mb-1">Payment Method</h4>
                  <p className="text-[#1A1F3A] font-medium uppercase">{paymentForm.paymentMethod} Payment</p>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-[#1A1F3A] hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                Place Order
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
