const baseurl=process.env.NEXT_PUBLIC_API_URL

interface ICred {
    name: string,
    password: string
}

interface IRegData {
    name: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
}

export const signIn = async (cred: ICred) => {
    const response = await fetch(`${baseurl}/account/sign-in`, {
        method: "POST",
        mode: "cors",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cred),
    });

    return response.json();
}

export const signUp = async (regData: IRegData) => {
    const response = await fetch(`${baseurl}/account/sign-up`, {
        method: "POST",
        mode: "cors",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(regData),
    });

    return response.json();
}