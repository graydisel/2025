import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import type {RootState} from "../redux/reducers";
import type {Book, ProductFilter} from "../types/product.ts";
import {clearFilters, fetchProducts, setFilters} from "../redux/slices/productSlice.ts";
import {addToCart} from "../redux/slices/cartSlice.ts";
import { Container, Typography, CircularProgress, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import type { SelectChangeEvent } from '@mui/material/Select';
import BookCard from "../components/common/BookCard.tsx";
import type {AppDispatch} from "../redux/store.ts";
import {genres} from "../data/genres.ts";

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading, error, filters} = useSelector((state: RootState) => state.products);
    const [localFilters, setLocalFilters] = useState<ProductFilter>(filters);

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleAddToCart = (book: Book) => {
        dispatch(addToCart(book));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>, child?: React.ReactNode) => {
        const { name, value } = event.target;

        handleFilterChange({
            target: {
                name: name,
                value: value
            }
        } as React.ChangeEvent<HTMLSelectElement>);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | { name?: string; value: unknown }>) => {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        const { name, value } = target;

        if (name === 'sortBy' || name === 'sortOrder') {
            setLocalFilters(prevFilters => ({
                ...prevFilters,
                [name]: value === '' ? undefined : value
            }));
        } else {
            const parsedValue = (name === 'minPrice' || name === 'maxPrice') ? (value === '' ? undefined : Number(value)) : value;
            setLocalFilters(prevFilters => ({
                ...prevFilters,
                [name!]: parsedValue,
            }));
        }
    };

    const handleApplyFilters = () => {
        dispatch(setFilters(localFilters));
        dispatch(fetchProducts(localFilters));
    };
    const handleClearFilters = () => {
        dispatch(clearFilters());
        dispatch(fetchProducts({}));
        setLocalFilters({});
    };


    if (loading) {
        return(
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
            </Box>
        )
    }
    if (error) {
        return (
            <div>
                Some error happened: {error}. Please return to the <a href="/">main</a> page
            </div>
        )
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Our books
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <TextField
                    label="Search by book name / author"
                    name="searchTerm"
                    value={localFilters.searchTerm || ''}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                />
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel>Genre</InputLabel>
                    <Select
                        name="genre"
                        value={localFilters.genre || ''}
                        label="Genre"
                        onChange={handleSelectChange}
                     variant={"standard"}>
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {genres.map(genre => (
                            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Min. price"
                    name="minPrice"
                    type="number"
                    value={localFilters.minPrice || ''}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                />
                <TextField
                    label="Max. price"
                    name="maxPrice"
                    type="number"
                    value={localFilters.maxPrice || ''}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                />

                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        name="sortBy"
                        value={localFilters.sortBy || ''}
                        label="Sort By"
                        onChange={handleSelectChange}
                        variant={"standard"}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="author">Author</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel>Order</InputLabel>
                    <Select
                        name="sortOrder"
                        value={localFilters.sortOrder || ''}
                        label="Order"
                        onChange={handleSelectChange}
                        variant={"standard"}
                    >
                        <MenuItem value="">
                            <em>Default</em>
                        </MenuItem>
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" onClick={handleApplyFilters}>
                    Apply Filters
                </Button>
                <Button variant="outlined" onClick={handleClearFilters}>
                    Reset Filters
                </Button>
            </Box>

            <Grid container spacing={4} justifyContent="center">
                {products.length > 0 ? (
                    products.map((book) => (
                        <Grid  size={{xs: 12, sm: 6, md: 4, lg: 3}} key={book.id}>
                            <BookCard book={book} onAddToCart={handleAddToCart} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="text.secondary">
                        No books find by your search.
                    </Typography>
                )}
            </Grid>
        </Container>
    )
}

export default Products