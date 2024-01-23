"use client";

import React from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { editBook } from '../store/bookSlice';

type EditBookModalProps = {
  id: string | null,
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>, 
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
      .required('Name is required')
      .min(3, 'Title should be at least 3 characters.'),
  price: Yup.number()
      .required('Price is required'),
  category: Yup.string()
      .required('Category is required.'),
  description: Yup.string()
      .required('Description is required.'),
})

export default function EditBookModal({ isModalOpen , setIsModalOpen, id}: EditBookModalProps) {
  const dispatch = useAppDispatch();

  const { books } = useAppSelector((state) => state.book);

  const book = books.find((book) => book.id === id);

  const edit = (name: string, price: number, category: string, description: string) => {
    setIsModalOpen(false);
    const updatedBook = {
      id: id!,
      name,
      price,
      category,
      description
    };
    dispatch(editBook(updatedBook));
  }

  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Edit Book</Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
                <Formik
                    initialValues={{
                        name: book ? book.name : "",
                        price: book ? book.price : 0,
                        category: book ? book.category : "",
                        description: book ? book.description : ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {resetForm}) => {
                        const {name, price, category, description} = values;
                        edit(name, price, category, description);
                        resetForm();
                    }}
                >
                    {({handleSubmit, handleChange, values, touched, errors}) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                  <div className="mb-2 block">
                                      <Label htmlFor="name" value="Book Name" />
                                  </div>
                                  <TextInput id="name" type="text" value={values.name} onChange={handleChange} />
                                  {
                                      touched.name && errors.name && <div className="error-message">{errors.name}</div>
                                  }
                            </div>
                            <div className="mb-6">
                                <div className="mb-2 block">
                                    <Label htmlFor="price" value="Price" />
                                </div>
                                <TextInput id="price" type="text" value={values.price} onChange={handleChange} />
                                {
                                    touched.price && errors.price && <div className="error-message">{errors.price}</div>
                                }
                            </div>
                            <div className="mb-6">
                                <div className="mb-2 block">
                                    <Label htmlFor="category" value="Category" />
                                </div>
                                <TextInput id="category" type="text" value={values.category} onChange={handleChange} />
                                {
                                    touched.category && errors.category && <div className="error-message">{errors.category}</div>
                                }
                            </div>
                            <div className="mb-6">
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="Description" />
                                </div>
                                <TextInput id="description" type="text" value={values.description} onChange={handleChange} />
                                {
                                    touched.description && errors.description && <div className="error-message">{errors.description}</div>
                                }
                            </div>
                            <div className='flex justify-end mt-4'>
                                <Button type="submit" className="ml-2">Edit</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal.Body>
    </Modal>
  )
}
