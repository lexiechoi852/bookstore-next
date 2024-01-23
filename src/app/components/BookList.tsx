"use client";

import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Button, Table } from 'flowbite-react';
import { deleteBook } from '../store/bookSlice';
import EditBookModal from './EditBookModal';

export default function BookList() {
    const dispatch = useAppDispatch();

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    const { books } = useAppSelector((state) => state.book);

    const editBook = (bookId: string) => {
        setIsEditModalOpen(true)
        setSelectedBookId(bookId);
    }

    const removeBook = (e: React.MouseEvent<HTMLButtonElement>, bookId: string) => {
        e.stopPropagation();
        dispatch(deleteBook(bookId));
    }

    return (
        <div>
            <Table>
                <Table.Head>
                    <Table.HeadCell className="bg-gray-200">Name</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Price</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Category</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Description</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">
                        <span className="sr-only">Delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {books.map((book) => (
                        <Table.Row
                            key={book.id}
                            onClick={() => editBook(book.id)}
                            className="cursor-pointer hover:bg-gray-50"
                        >
                            <Table.Cell>{book.name}</Table.Cell>
                            <Table.Cell>${book.price}</Table.Cell>
                            <Table.Cell>{book.category}</Table.Cell>
                            <Table.Cell>{book.description}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={(e) => removeBook(e, book.id)}>
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <EditBookModal 
                id={selectedBookId}
                isModalOpen={isEditModalOpen} 
                setIsModalOpen={setIsEditModalOpen} 
            />
        </div>
    )
}
