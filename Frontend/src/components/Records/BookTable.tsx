import React, { useState, useEffect } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { Button as AButton, Space, Table, Input } from "antd";
import { useNavigate } from "react-router-dom";

type OnChange = NonNullable<TableProps<Book>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;



interface Book {
  id: number;
  name: string;
  author: string;
  publisher: string;
  publicationYear: string;
  subject: string;
}

interface BookTableProps {
  bookData: any;
  inputValue: string;
}

const BookTable: React.FC<BookTableProps> = ({
  bookData,
  inputValue,
}) => {
  const [data, setData] = useState<Book>(bookData);

  useEffect(() => {
    if (bookData!==null) {
      setData(bookData);
    } else {
      setData({} as Book);
    }
  }, [bookData]);

  useEffect(() => {
    setSearchQuery(inputValue);
  }, [inputValue]);
  const [viewDialog, setViewDialog] = useState(false);
  const [recordIdToUpdate, setRecordIdToUpdate] = useState<number>(-1);
  const [BookNber, setBookNber] = useState<number>(0);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
 ;
  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };


  const columns: TableColumnsType<Book> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
      width: 100,   },
    {
      title: "Book Name",
      dataIndex: "name",
      key: "name",
      filters: Array.isArray(bookData) ? bookData.map((book: Book) => ({
        text: book.name,
        value: book.name,
      })) : [],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      filters: Array.isArray(bookData) ? bookData.map((book: Book) => ({
        text: book.author,
        value: book.author,
      })):[],
      filteredValue: filteredInfo.author || null,
      onFilter: (value, record) => record.author.includes(value as string),
      sorter: (a, b) => a.author.length - b.author.length,
      sortOrder: sortedInfo.columnKey === "author" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
      filters: Array.isArray(bookData) ? bookData.map((book: Book) => ({
        text: book.publisher,
        value: book.publisher,
      })):[],
      filteredValue: filteredInfo.publisher || null,
      onFilter: (value, record) => record.publisher.includes(value as string),
      sorter: (a, b) => a.publisher.length - b.publisher.length,
      sortOrder: sortedInfo.columnKey === "publisher" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Publication Year",
      dataIndex: "publicationYear",
      key: "publicationYear",
      filters: Array.isArray(bookData) ? bookData.map((book: Book) => ({
        text: book.publicationYear,
        value: book.publicationYear,
      })):[],
      filteredValue: filteredInfo.publicationYear || null,
      onFilter: (value, record) => record.publicationYear.includes(value as string),
      sorter: (a, b) => a.publicationYear.length - b.publicationYear.length,
      sortOrder: sortedInfo.columnKey === "publicationYear" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      filters: Array.isArray(bookData) ? bookData.map((book: Book) => ({
        text: book.subject,
        value: book.subject,
      })):[],
      filteredValue: filteredInfo.subject || null,
      onFilter: (value, record) => record.subject.includes(value as string),
      sorter: (a, b) => a.subject.length - b.subject.length,
      sortOrder: sortedInfo.columnKey === "subject" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
   
  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery !== "") {
      const filteredData = Array.isArray(data) ? data.filter((book: Book) =>
        Object.values(book).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) : data;
      setData(filteredData as Book); // Fix: Cast filteredData as Book[]
    } else {
      setData(bookData);
    }
  }, [searchQuery]);
  return (
    <>
      <Space style={{ marginBottom: 12 }}>
        
      </Space>
      <Table
        columns={columns}
        dataSource={data as unknown as readonly Book[]} // Fix: Cast data as readonly Book[]
        onChange={handleChange}
        className="h-[90%] w-full "
        pagination={{
          defaultPageSize: 8,
        }}
        scroll={{ x: 1000 }}
      />
      
      
    </>
  );
};

export default BookTable;
