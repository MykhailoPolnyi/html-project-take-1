const BASE_URL = "http://localhost:3000";
const RESOURCE_URL = `${BASE_URL}/orders`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
  try {
    const reqParams = {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body
    };

    if (body) {
      reqParams.body = JSON.stringify(body);
    }

    return await fetch(`${RESOURCE_URL}${urlPath}`, reqParams);
  } catch (error) {
    console.error("HTTP ERROR: ", error);
  }
};


export const getOrders = async () => {
  const rawResponse = await baseRequest({ method: "GET" });

  return await rawResponse.json();
};

export const postOrder = (body) => baseRequest({ method: "POST", body });

export const updateOrder = (id, body) => baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteOrder = (id) => baseRequest({ urlPath: `/${id}`, method: "DELETE" });