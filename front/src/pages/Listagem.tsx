import { FaSortUp, FaSortDown, FaChevronRight, FaChevronLeft, } from "react-icons/fa";
import { Container, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import excluir from "../images/excluir.png";
import ReactPaginate from "react-paginate";
import editar from "../images/editar.png";
import axios from "axios";
import "../App.css";
import { URI } from "../enumerations/uri";
import { avisoDeletar } from "../controllers/avisoConcluido";
import { avisoErroDeletar } from "../controllers/avisoErro";
import { Link } from "react-router-dom";
import { Clientes } from "../types";

function ListagemCliente() {

  const url_atual = window.location.href;
  const id = window.location.href.split("/")[4]

  const [data, setData] = useState<Clientes[]>([]);

  //axios get
  useEffect(() => {
    async function fetchBooks() {
      axios
        .get(URI.PEGAR_CLIENTE)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchBooks();
  }, []);

  //delete
  async function handleDeleteBook(id: number) {
    try {
      avisoDeletar().then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${URI.DELETE_CLIENTE}${id}`);
          const updatedBooks = data.filter((book) => book.id !== id);
          setData(updatedBooks);
        }
      })

    } catch (error) {
      console.error(error);
      avisoErroDeletar();
    }
  }


  //sort
  const [order, setOrder] = useState<"ASC" | "DSC">("ASC");
  const sorting = (col: keyof typeof data[0]) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  //search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredData = data.filter(
    (item) =>
      item.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cargo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">
          LISTAGEM CLIENTES
        </h1>
      </div>
      <Container className="px-2 mb-5">
        <Container>
          <Table bordered hover responsive>
            <thead>
              <tr>
                {/*cabeçalho tabela*/}
                <th onClick={() => sorting("id")} className="text-center">ID{order === "ASC" ? <FaSortUp /> : <FaSortDown />}</th>
                <th onClick={() => sorting("nome")} className="text-center">Nome{order === "ASC" ? <FaSortUp /> : <FaSortDown />}</th>
                <th onClick={() => sorting("email")} className="text-center">Email{order === "ASC" ? <FaSortUp /> : <FaSortDown />}</th>
                <th onClick={() => sorting("cargo")} className="text-center">Cargo{order === "ASC" ? <FaSortUp /> : <FaSortDown />}</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .slice(pagesVisited, pagesVisited + itemsPerPage)
                .map((data) => {
                  return (
                    <tr key={data.id}>
                      {/*corpo tabela*/}
                      <td className="text-center">{data.id}</td>
                      <td className="text-center">{data.nome}</td>
                      <td className="text-center">{data.email}</td>
                      <td className="text-center">{data.cargo}</td>
                      <td className="text-center"><Link to={"/editar/" + data.id}><img style={{ width: '25px' }} src={editar} alt='Editar' /></Link>
                        <img style={{ width: "35px" }} src={excluir} alt="Excluir" onClick={() => handleDeleteBook(data.id)} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            {/*pagination*/}
            {data.length > itemsPerPage && (
              <ReactPaginate
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination right"}
                activeClassName={"active"}
              />
            )}
          </Table>
        </Container>
      </Container>
    </>
  );
}

export default ListagemCliente;
