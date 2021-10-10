const BASE_URL = "http://localhost:3000";
const RESOURCE_URL = `${BASE_URL}/orders`;

const base_request = async ({ urlPath: url_path = "", method = "GET", body = null }) => {
  try {
    const req_params = {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body
    };

    if (body) {
      req_params.body = JSON.stringify(body);
    }

    return await fetch(`${RESOURCE_URL}${url_path}`, req_params);
  } catch (error) {
    console.error("HTTP ERROR: ", error);
  }
};


export const get_orders = async () => {
  const rawResponse = await base_request({ method: "GET" });

  return await rawResponse.json();
};

export const post_order = async (body) => base_request({ method: "POST", body });

export const update_order = async (id, body) => base_request({ urlPath: `/${id}`, method: "PUT", body });

export const delete_order = async (id) => base_request({ urlPath: `/${id}`, method: "DELETE" });
