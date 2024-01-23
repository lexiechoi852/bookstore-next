"use client";

import React, { useState } from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { nanoid } from 'nanoid';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useAppDispatch } from '../store/hooks';
import { addBook } from '../store/bookSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string()
      .required('Name is required')
      .min(3, 'Title should be at least 3 characters.'),
  price: Yup.number()
      .required('Price is required')
      .min(1, 'Price should higher than $0'),
  category: Yup.string()
      .required('Category is required.'),
  description: Yup.string()
      .required('Description is required.'),
})

export default function AddBookModal() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const add = (name: string, price: number, category: string, description: string) => {
      setIsModalOpen(false);
      const newBook = {
          id: nanoid(),
          name,
          price,
          category,
          description
      };
      dispatch(addBook(newBook))
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Add Book</Button>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header>Add Book</Modal.Header>
          <Modal.Body>
              <div className="space-y-6">
                  <Formik
                      initialValues={{
                          name: '',
                          price: 0,
                          category: '',
                          description: ''
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values, {resetForm}) => {
                          const {name, price, category, description} = values;
                          add(name, price, category, description);
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
                                  <Button type="submit" className="ml-2">Add</Button>
                              </div>
                          </Form>
                      )}
                  </Formik>
              </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}
