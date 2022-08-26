import React, {useEffect, useState} from "react";
import {Option} from "antd/es/mentions";


const GenreUtil = () => {

    const genres = ["Art", "Biography", "Business", "Chick Lit", "Children's", "Christian", "Classics",
        "Comics", "Contemporary", "Cookbooks", "Crime", "Ebooks", "Fantasy", "Fiction",
        "Gay and Lesbian", "Graphic Novels", "Historical Fiction", "History", "Horror",
        "Humor and Comedy", "Manga", "Memoir", "Music", "Mystery", "Nonfiction", "Paranormal",
        "Philosophy", "Poetry", "Psychology", "Religion", "Romance", "Science", "Science Fiction",
        "Self Help", "Suspense", "Spirituality", "Sports", "Thriller", "Travel", "Young Adult"]

    const [genreOptions, setGenreOptions] = useState([]);


    const GetGenreOptions = () => {
        const options = [];
        genres.forEach((genre) => {
            options.push(<Option key={genre}>{genre}</Option>)
        })
        setGenreOptions(options);
    }

    useEffect(() => {
        GetGenreOptions()
    }, [])


    const genreFilters = genres.map((genre) => {
        return {text: genre, value: genre}
    })

    const Filter = (genres, value) => {
        let contains = false;
        genres.map((genre) => {
            if (genre.name.indexOf(value) === 0) {
                return contains = true;
            }
            return contains;
        })
        return contains;
    }

    return (
        {
            genres: genres,
            genreFilters: genreFilters,
            Filter: Filter,
            genreOptions: genreOptions
        }
    )


}
export default GenreUtil