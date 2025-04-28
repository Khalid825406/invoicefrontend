import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState('');
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

  const handleCompanyCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://invoicebackend-nine.vercel.app/companies', { name: companyName });
      setCompanies([...companies, res.data]);
      setCompanyName('');
      setSuccessMessage('Company created successfully!');
    } catch (error) {
      console.error('Failed to create company', error);
    }
  };

  const handleInvoiceSubmit = async (e) => {
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
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Left Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#f8f9fa', padding: '20px', overflowY: 'auto' }}>
        <h2>Companies</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {companies.map((company) => (
            <li key={company._id} style={{ marginBottom: '10px' }}>
              <Link
                to={`/company/${company._id}`}
                style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
              >
                {company.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Main Area */}
      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Dashboard</h1>

        {successMessage && (
          <div style={{ marginBottom: '20px', backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '8px' }}>
            {successMessage}
          </div>
        )}

        {/* Create Company */}
        <div style={{ marginBottom: '40px' }}>
          <h2>Create Company</h2>
          <form onSubmit={handleCompanyCreate} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', flex: 1 }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#007BFF',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Add Company
            </button>
          </form>
        </div>

        {/* Create Invoice */}
        <div>
          <h2>Create Invoice</h2>
          <form onSubmit={handleInvoiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
            <select
              name="companyId"
              value={formData.companyId}
              onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
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

            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              placeholder="Invoice Number"
              required
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />

            <input
              type="number"
              name="voucher"
              value={formData.voucher}
              onChange={(e) => setFormData({ ...formData, voucher: e.target.value })}
              placeholder="Voucher Amount"
              required
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />

            <input
              type="number"
              name="voucher_nt"
              value={formData.voucher_nt}
              onChange={(e) => setFormData({ ...formData, voucher_nt: e.target.value })}
              placeholder="Voucher NT Amount"
              required
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />

            <input
              type="number"
              name="voucher_ar"
              value={formData.voucher_ar}
              onChange={(e) => setFormData({ ...formData, voucher_ar: e.target.value })}
              placeholder="Voucher AR Amount"
              required
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />

            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={(e) => setFormData({ ...formData, total: e.target.value })}
              placeholder="Total Amount"
              required
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: '#28a745',
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
      </div>
    </div>
  );
};


export default Dashboard;
