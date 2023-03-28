import useFetch from "react-fetch-hook";

export class Method {
  constructor(table, port) {
    this.table = table;
    this.port = port;
  }

  get(id = "", hValue = "") {
    const { data } = useFetch(
      `http://35.209.247.117:${this.port}/${this.table}/${id}`,
      {
        headers: {
          authorization: hValue,
        },
      }
    );

    if (typeof data == "undefined") {
    } else {
      return data;
    }
  }

  post(data) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {};

    for (const i in data) {
      const key = i.toString();

      raw[key] = data[i];
    }

    raw = JSON.stringify(raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`http://35.209.247.117:${this.port}/${this.table}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (typeof result.idUser !== "undefined") {
          window.localStorage.setItem("userLogin", result.idUser);
          window.location.href = "/MyVideos";
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  }

  delete(data) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(
      `http://35.209.247.117:${this.port}/${this.table}/${Object.values(data)}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
      })
      .then((e) => window.location.reload())
      .catch((error) => console.log("error", error));
  }
}
