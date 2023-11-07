
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
    const { username } = useParams();
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setpassword] = useState('')
    const [role, setrole] = useState('')

    const [data, setData] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        fetch(" http://localhost:9999/user/" + username)
            .then((x) => x.json())
            .then((x) => {
                setData(x);
                setEmail(x.email)
                setFullname(x.fullname)
                setpassword(x.password)
                setrole(x.role)
            })
    }, []);

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (fullname === null || fullname === '') {
            isproceed = false;
            errormessage += 'Full name'
        } else if (email === null || email === '') {
            isproceed = false;
            errormessage += 'Email address'
        }
        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        let updateOjb = { ...data, fullname, email, password, role }
        if (IsValidate()) {
            fetch("http://localhost:9999/user/" + username, {
                method: "PUT",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(updateOjb)
            }).then((res) => {
                toast.success('Update successfully.')
                navigate('/user/' + username);
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    };

    return (
        <>

            <div className="container my-3 py-3">
                <h1 className="text-center">Edit Profile</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleUpdate}>
                            <div className="form my-3">
                                <label htmlFor="Name">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Username"
                                    value={data.id}
                                    disabled
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={fullname}
                                    onChange={e => setFullname(e.target.value)}
                                // required
                                />
                            </div>

                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@gmail.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                // required
                                />
                            </div>

                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
export default EditProfile