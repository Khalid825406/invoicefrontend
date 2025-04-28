    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import axios from 'axios';
    import { 
    List, 
    ListItem, 
    ListItemText, 
    Button, 
    TextField,
    Paper,
    Typography
    } from '@mui/material'; // Updated to MUI v5

    const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState('');

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
        const res = await axios.get('https://invoicebackend-nine.vercel.app/companies');
        setCompanies(res.data);
        } catch (err) {
        console.error(err);
        }
    };

    const addCompany = async () => {
        if (!newCompany.trim()) return;
        
        try {
        const res = await axios.post('https://invoicebackend-nine.vercel.app/companies', {
            name: newCompany
        });
        setCompanies([...companies, res.data]);
        setNewCompany('');
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
            Companies
        </Typography>
        
        <div style={{ display: 'flex', marginBottom: '20px' }}>
            <TextField
            label="New Company"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            fullWidth
            variant="outlined"
            />
            <Button 
            variant="contained" 
            color="primary" 
            onClick={addCompany}
            style={{ marginLeft: '10px' }}
            >
            Add
            </Button>
        </div>
        
        <List>
            {companies.map((company) => (
            <ListItem 
                key={company._id} 
                button 
                component={Link} 
                to={`/company/${company._id}`}
            >
                <ListItemText primary={company.name} />
            </ListItem>
            ))}
        </List>
        </Paper>
    );
    };

    export default CompanyList;