import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

import { backendUrl } from '../../data';

const useStyles = makeStyles((theme) => ({
  textField: {
    backgroundColor: 'white', // Background color
    borderRadius: '4px',
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightgray', // Border color
      },
      '&:hover fieldset': {
        borderColor: 'blue', // Hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green', // Focused border color
      },
    },
  },
}));

const validationSchema = yup.object({
  title: yup.string('Enter title').required('Title is required'),
  author: yup.string('Enter author').required('Author is required'),
  ISBN: yup.string('Enter ISBN').required('ISBN is required'),
  publisher: yup.string('Enter publisher'),
  datePublished: yup.date('Enter date published'),
  copies: yup.number('Enter copies').required('No. of copies are required')
  
});

const addBookApi = async (bookData) => {
  try {
    const response = await axios.post(`${backendUrl}book/add`, bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Add = ({handleClose, updateTrigger}) => {
  const classes = useStyles();

  const [book, setBook] = useState({
    title: '',
    author: '',
    ISBN: '',
    publisher: '',
    datePublished: '',
    copies: '',
  });

  const formik = useFormik({
    initialValues: book,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addBookApi(values);

        handleClose()
        updateTrigger()
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert('Book already exists');
        } else {
          console.log(error);
          alert('Something went wrong, please try again');
        }
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        className={classes.textField} 
      />

      <TextField
        fullWidth
        id="author"
        name="author"
        label="Author"
        value={formik.values.author}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.author && Boolean(formik.errors.author)}
        helperText={formik.touched.author && formik.errors.author}
        className={classes.textField} 
      />

      <TextField
        fullWidth
        id="ISBN"
        name="ISBN"
        label="ISBN"
        value={formik.values.ISBN}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.ISBN && Boolean(formik.errors.ISBN)}
        helperText={formik.touched.ISBN && formik.errors.ISBN}
        className={classes.textField} 
      />

      <TextField
        fullWidth
        id="publisher"
        name="publisher"
        label="Publisher"
        value={formik.values.publisher}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.publisher && Boolean(formik.errors.publisher)}
        helperText={formik.touched.publisher && formik.errors.publisher}
        className={classes.textField} 
      />

      <TextField
        fullWidth
        id="datePublished"
        name="datePublished"
        label="Date Published"
        type="date"
        value={formik.values.datePublished}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.datePublished && Boolean(formik.errors.datePublished)}
        helperText={formik.touched.datePublished && formik.errors.datePublished}
        InputLabelProps={{ shrink: true }} 
        className={classes.textField}
      />

      <TextField
        fullWidth
        id="copies"
        name="copies"
        label="Copies"
        type="number"
        value={formik.values.copies}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.copies && Boolean(formik.errors.copies)}
        helperText={formik.touched.copies && formik.errors.copies}
        className={classes.textField} 
      />
      
        <Button color="primary" variant="contained" fullWidth type="submit">
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default Add;
