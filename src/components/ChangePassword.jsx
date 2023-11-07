import { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { username } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch(`http://localhost:9999/user/${username}`)
            .then((x) => x.json())
            .then((x) => {
                setUser(x);
            })
    }, []);

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (oldPassword === null || oldPassword === '') {
            isproceed = false;
            errormessage += 'Old Password'
        } else if (newPassword === null || newPassword === '') {
            isproceed = false;
            errormessage += 'New Password'
        }
        if (!isproceed) {
            toast.warning(errormessage)
        }
        return isproceed;
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        if (IsValidate()) {
            if (oldPassword !== user.password) return toast.error("Old password is incorrect!")
            if (!newPassword) {
                toast.error("Please fill in all fields!");
                return;
            }
            fetch(`http://localhost:9999/user/${username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...user, password: newPassword }),
            })
                .then((x) => {
                    setUser({ ...user, password: newPassword });
                    toast.success("Change password successfully!");
                    setNewPassword('')
                    setOldPassword('')
                })
                .catch((err) => toast.error("Change password failed!"));
        }
    };

    return (
        <>
            <div className="container my-5 py-5">
                <hr/>
                <h3 className="text-center">Change password</h3>
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleUpdate}>
                            <div class="my-3">
                                <label for="display-4">Old Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="floatingInput"
                                    placeholder="Username"
                                    value={oldPassword}
                                    onChange={e => { setOldPassword(e.target.value) }}
                                />
                            </div>
                            <div class="my-3">
                                <label for="floatingPassword display-4">New Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={newPassword}
                                    onChange={e => { setNewPassword(e.target.value) }}
                                />
                            </div>

                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit">
                                    Change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
