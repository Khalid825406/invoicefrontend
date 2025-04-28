import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const CompanyDetail = () => {
  const { id } = useParams();
  const [companyName, setCompanyName] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pdfRefs = useRef({}); // <-- Har invoice ka alag ref

  useEffect(() => {
    fetchCompanyAndInvoices();
  }, [id]);

  const fetchCompanyAndInvoices = async () => {
    try {
      setLoading(true);

      const companyRes = await axios.get(`https://invoicebackend-nine.vercel.app/companies/${id}`);
      setCompanyName(companyRes.data.name);

      const invoicesRes = await axios.get(`https://invoicebackend-nine.vercel.app/companies/${id}/invoices`);
      setInvoices(invoicesRes.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const downloadSingleInvoice = (invoiceId) => {
    const element = pdfRefs.current[invoiceId];
    if (!element) return;

    const downloadButton = element.querySelector('button');
    
    if (downloadButton) {
      downloadButton.style.display = 'none';
    }

    const opt = {
      margin: 0.5,
      filename: `${companyName}_invoice_${invoiceId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        if (downloadButton) {
          downloadButton.style.display = 'inline-block';
        }
      })
      .catch((err) => {
        console.error('PDF Download Error:', err);
        if (downloadButton) {
          downloadButton.style.display = 'inline-block';
        }
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{companyName}</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div
              key={invoice._id}
              ref={(el) => (pdfRefs.current[invoice._id] = el)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '600px',
                position: 'relative'
              }}
            >
              {/* Download Button Top-Right */}
              <button
                onClick={() => downloadSingleInvoice(invoice._id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#FF9900',
                  border: 'none',
                  padding: '8px 15px',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Download
              </button>

              {/* Company Name per invoice */}
              <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '26px', fontWeight: 'bold', color: '#333' }}>
                {companyName}
              </h2>

              {/* Invoice Number */}
              <h3 style={{ textAlign: 'start', marginBottom: '10px', fontSize: '22px' }}>
                Invoice: {invoice.invoiceNumber}
              </h3>

              {/* Invoice Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Invoice Number: {invoice.invoiceNumber}
                </div>
                <div style={{ fontSize: '14px', color: '#777' }}>
                  {new Date(invoice.date).toLocaleDateString()}
                </div>
              </div>

              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Voucher:</strong> ₹{invoice.voucher}
              </div>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Total:</strong> ₹{invoice.total}
              </div>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Balance:</strong> ₹{invoice.balance}
              </div>
            </div>
          ))
        ) : (
          <div>No invoices available.</div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;