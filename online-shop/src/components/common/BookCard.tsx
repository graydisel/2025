import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import type {Book} from "../../types/product.ts";

interface BookCardProps {
    book: Book;
    onAddToCart: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardMedia
                component="img"
                height="140"
                image={book.imageUrl}
                alt={book.title}
                sx={{ objectFit: 'contain', padding: 1 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Жанр: {book.genre}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
                    ${book.price.toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onAddToCart(book)}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default BookCard;