import React, { useEffect, useState } from "react";
import { useDataLayerContext } from "../DataLayer";
import "../App.css";
import { toast } from "react-toastify";
function Category() {
  const [categories, setCategories] = useState([]);
  const [{ token, user_id }] = useDataLayerContext();
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (index, id) => {
    let response = await fetch(`/app/getCategoryQuestion/?id=${id}`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    // console.log(response);
    if (response.status === 200) {
      let result = await response.json();
      setQuestions(result?.questions);
    } else {
      toast.error("Something went wrong");
    }

    let box = document.getElementById("box" + index);
    if (box && box.style.display === "block") {
      box.style.display = "none";
    } else if (box.style.display === "none") {
      box.style.display = "block";
    }
  };

  const addQuestion = async (id) => {
    let question = prompt("Enter Your Question Please");
    console.log(question);
    if (question) {
      let data = {
        id: id,
        user_id: user_id,
        question: question,
      };
      let response = await fetch("/app/addQuestion", {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        let result = await response.json();
        toast.success(result?.message);
      } else {
        toast.error("Something gone wrong");
      }
    } else {
      toast.info("Plese Enter Question");
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      let response = await fetch("/app/getAllCategory", {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        let result = await response.json();
        setCategories(result?.categories);
      }
    };
    getCategory();
  }, []);

  return (
    <div>
      <div className="d-flex">
        {categories &&
          typeof categories === "object" &&
          categories.map((element, index) => {
            return (
              <div
                key={element?._id}
                style={{
                  display: "flex",
                  width: "100px",
                  flexDirection: "column",
                  backgroundColor: "#0a5876",
                  padding: "4px",
                  color: "white",
                  margin: "10px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.nativeEvent.stopImmediatePropagation();
                  fetchQuestions(index, element?._id);
                }}
              >
                <p>{element?.cat_name}</p>
                <section>
                  <span
                    className="material-icons "
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();

                      addQuestion(element?._id);
                    }}
                  >
                    add
                  </span>
                </section>
              </div>
            );
          })}
      </div>
      <div>
        <h1>Questions & Answers</h1>
        <small className="ms-2">click on Any Category For view Details</small>
        {questions &&
          typeof questions === "object" &&
          questions.map((element, index) => {
            return (
              <section
                key={"question" + index}
                className="m-1 p-2"
                style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
              >
                <p>Q : {element?.faq}</p>
                <p>A : {element?.ans}</p>
              </section>
            );
          })}
      </div>
    </div>
  );
}

export default Category;
