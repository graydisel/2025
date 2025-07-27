import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import api from "../services/api.ts";


const AdminAddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        cover: '',
        price: '',
        imageUrl: '',
        description: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/admin/products', formData);
            setStatus('Book added successfully!');
            setFormData({
                title: '', author: '', genre: '', cover: '', price: '', imageUrl: '', description: ''
            });
        } catch (error) {
            setStatus('Failed to add book.');
            console.error(error);
        }
    };

    return (
        <Box sx={{ p: 4, flex: 1 }}>
            <Typography variant="h4" gutterBottom>Add New Book</Typography>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required />
                <TextField label="Author" name="author" value={formData.author} onChange={handleChange} required />
                <TextField label="Genre" name="genre" value={formData.genre} onChange={handleChange} required />
                <TextField label="Cover" name="cover" value={formData.cover} onChange={handleChange} required />
                <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                <TextField label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={4} />
                <Button type="submit" variant="contained" color="primary">Add Book</Button>
                {status && <Typography color={status.includes('success') ? 'success.main' : 'error'}>{status}</Typography>}
            </Paper>
        </Box>
    )
}

export default AdminAddProduct