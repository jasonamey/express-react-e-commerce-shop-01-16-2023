import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  TextField,
  Grid,
  Button,
  Container,
  InputAdornment,
  Typography,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const initialValues = {
  title: "",
  description: "",
  price: 0,
  format: "",
  year: "",
};

const validationSchema = yup.object({
  title: yup
    .string("Enter a Title")
    .min(2, "LP should be longer than 2 characters")
    .required("Title is required"),
  description: yup
    .string("Enter a Description")
    .min(2, "Description should be at least 2 characters length")
    .required("Description is required"),
  price: yup
    .number("Enter a price")
    .positive("Price must be positive")
    .min(5, "Price must be more than $5")
    .max(30, "Price can not be more than $30")
    .required("Price is required"),
  year: yup.number("Choose a year").required("Year must be chosen"),
  format: yup.string("Choose a format").required("Format must be chosen"),
});

const AddProduct = () => {
  const [fileData, setFileData] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { token } = userLogin.userInfo;

  const onFileChange = (e) => {
    setFileData(e.target.files[0]);
  };

  const deleteHandler = () => {
    setFileData(null);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", fileData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/products/uploadImage`,
      formData,
      config
    );

    const { photoPath } = response.data;
    return photoPath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const photoPath = await uploadImage();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/products`,
      { ...formik.values, image: photoPath },
      config
    );
    formik.resetForm();
    setFileData(null);
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container maxWidth="md">
      <FormControl>
        <Grid container spacing={3} p={6}>
          <Grid item xs={12}>
            <Typography variant="h1">ADD A PRODUCT</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$ </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item sm={3} xs={6}>
            <FormControl fullWidth>
              <InputLabel id="year">Year</InputLabel>
              <Select
                id="year"
                name="year"
                defaultValue=""
                label="Year"
                value={formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helpertext={formik.touched.year && formik.errors.year}
              >
                {[1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980].map(
                  (item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={3} xs={6}>
            <FormControl fullWidth>
              <InputLabel id="format">Format</InputLabel>
              <Select
                id="format"
                name="format"
                defaultValue=""
                label="Format"
                value={formik.values.format}
                onChange={formik.handleChange}
                error={formik.touched.format && Boolean(formik.errors.format)}
                helpertext={formik.touched.format && formik.errors.format}
              >
                {["vinyl", "cd", "mp3", "8-track"].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={3} xs={6}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="button-file"
              type="file"
              onChange={onFileChange}
            />
            <label htmlFor="button-file">
              <Button
                fullWidth
                variant="outlined"
                component="span"
                size="large"
              >
                Upload Image
              </Button>
            </label>
          </Grid>
          <Grid item sm={3} xs={6}>
            <Typography variant="subtitle2">
              {fileData?.name}
              {fileData?.name && (
                <IconButton onClick={deleteHandler}>
                  <Delete />
                </IconButton>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  );
};

export default AddProduct;
