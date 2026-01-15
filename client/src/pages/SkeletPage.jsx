import React, { useEffect, useState } from "react";
import { SquarePlus, X } from "lucide-react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import AddForm from "../features/AddForm/AddForm";
import SkeletCard from "../widgets/SkeletCard/SkeletCard";
import axiosInstance from "../shared/lib/axiosInstance";
import Loader from "../shared/hocs/Loader";

export default function SkeletPage({ user }) {
  const [skelets, setSkelets] = useState([]);
  const [addForm, showAddForm] = useState(false);

  async function getSkelets() {
    try {
      const { data } = await axiosInstance(`/api/skelets`);

      if (data) setSkelets(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSkelets();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));
      const newSkelet = {
        name: dataForApi.name,
        description: dataForApi.description,
        status: dataForApi.status,
      };

      if (!dataForApi.name || !dataForApi.description || !dataForApi.status)
        return alert("Заполните все поля");
      const response = await axiosInstance.post("/api/skelets", newSkelet);

      if (response.status === 201) {
        setSkelets((prev) => [response.data, ...prev]);
        targetData.reset();
      }
      showAddForm((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (id, updateSkelet) => {
    try {
      const response = await axiosInstance.put(`/api/skelets/${id}`, {
        name: updateSkelet.name,
        description: updateSkelet.description,
        status: updateSkelet.status,
      });

      setSkelets((prev) =>
        prev.map((el) => (el.id === id ? response.data : el))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete(`/api/skelets/${id}`);
      setSkelets(skelets.filter((el) => el.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loader isLoading={!user.data?.id}>
        <Row>
          {skelets.length === 0
            ? "Здесь еще нет скелетов, но ты можешь их добавить..."
            : skelets.map((obj) => (
                <SkeletCard
                  key={obj.id}
                  skelet={obj}
                  onDelete={() => deleteHandler(obj.id)}
                  onUpdate={updateHandler}
                  user={user}
                />
              ))}
          {user.status !== "guest" ? (
            <Card>
              <button
                className="button_add_form"
                onClick={() => showAddForm((prev) => !prev)}
              >
                {addForm ? <X /> : <SquarePlus />}
              </button>
              {addForm ? <AddForm submitHandler={submitHandler} /> : ``}
            </Card>
          ) : (
            ``
          )}
        </Row>
      </Loader>
    </>
  );
}
