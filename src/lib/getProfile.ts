const baseurl = "https://jsonplaceholder.typicode.com"

export const getProfile = async (id: number) => {
    const response = await fetch(`${baseurl}/users/${id}`);

    if (!response.ok) throw new Error("profile fetch fail :(");

    return response.json();
}