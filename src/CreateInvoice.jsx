import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateInvoice = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    companyId: '',
    invoiceNumber: '',
    voucher: '',
    voucher_nt: '',
    voucher_ar: '',
    total: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('https://invoicebackend-nine.vercel.app/companies');
      setCompanies(res.data);
    } catch (error) {
      console.error('Failed to fetch companies', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://invoicebackend-nine.vercel.app/invoices', formData);
      setSuccessMessage('Invoice created successfully!');
      setFormData({
        companyId: '',
        invoiceNumber: '',
        voucher: '',
        voucher_nt: '',
        voucher_ar: '',
        total: '',
      });
    } catch (error) {
      console.error('Failed to create invoice', error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create New Invoice</h2>

      {successMessage && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px' }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Company Select Dropdown */}
        <select
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        {/* Invoice Number */}
        <input
          type="text"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          placeholder="Invoice Number"
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        {/* Voucher */}
        <input
          type="number"
          name="voucher"
          value={formData.voucher}
          onChange={handleChange}
          placeholder="Voucher Amount"
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        {/* Voucher NT */}
        <input
          type="number"
          name="voucher_nt"
          value={formData.voucher_nt}
          onChange={handleChange}
          placeholder="Voucher NT Amount"
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        {/* Voucher AR */}
        <input
          type="number"
          name="voucher_ar"
          value={formData.voucher_ar}
          onChange={handleChange}
          placeholder="Voucher AR Amount"
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        {/* Total */}
        <input
          type="number"
          name="total"
          value={formData.total}
          onChange={handleChange}
          placeholder="Total Amount"
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
