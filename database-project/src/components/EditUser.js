import {
    Button,
    Grid,
    Modal,
    NativeSelect,
    NumberInput,
    Paper,
    Radio,
    Text,
    TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import "./style.css";

function EditUser({ opened, setOpened, currentSelection }) {

    useEffect(() => {
        form.setFieldValue("firstName", currentSelection.firstName);
        form.setFieldValue("lastName", currentSelection.lastName);
        form.setFieldValue("address", currentSelection.address);
        form.setFieldValue("country", currentSelection.country);
        form.setFieldValue("city", currentSelection.city);
        form.setFieldValue("email", currentSelection.email);
        form.setFieldValue("phone", currentSelection.phone);
        form.setFieldValue("age", currentSelection.age);
        form.setFieldValue("gender", currentSelection.gender);
        form.setFieldValue("bloodGroup", currentSelection.bloodGroup);
        form.setFieldValue("appointmentDate", currentSelection.appointmentDate);
        form.setFieldValue("releseDate", currentSelection.releseDate);
        form.setFieldValue("user_id", currentSelection.user_id);
    }, [currentSelection])
    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            country: "",
            city: "",
            email: "",
            phone: "",
            age: 0,
            gender: "",
            bloodGroup: "",
            appointmentDate: "",
            releseDate: "",
            user_id: "",
        },
        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
        },
    });

    const handleSubmit = (data) => {
        return axios.post(`http://localhost:5000/userinfo/updateUser`, {
            ...data,
        });
    };

    const queryClient = useQueryClient();
    const { mutate } = useMutation(handleSubmit, {
        onSuccess: () => {
            queryClient.invalidateQueries("userinfo");
            setOpened(false);

        },
        onError: (error) => {
            queryClient.invalidateQueries("userinfo");
        },
    });

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} fullScreen>
                <Paper className="signup-form" padding="md" shadow="xl">
                    <Paper>
                        <Text component="h2">Patient Information</Text>

                        <Paper
                            padding="sm"
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                            }}
                        >
                            <TextInput
                                sx={{
                                    width: "50%",
                                }}
                                // mr="sm"
                                label="First Name"
                                required
                                placeholder="First name"
                                defaultValue={currentSelection.firstName || 'kalasan'}
                                // value={form.values.firstName}
                                onChange={(event) =>
                                    form.setFieldValue("firstName", event.currentTarget.value)
                                }
                            />
                            <TextInput
                                sx={{
                                    width: "50%",
                                }}
                                label="Last Name"
                                required
                                placeholder="Last name"
                                defaultValue={currentSelection.lastName}
                                onChange={(event) =>
                                    form.setFieldValue("lastName", event.currentTarget.value)
                                }
                            />
                        </Paper>

                        <Paper
                            padding="sm"
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                            }}
                        >
                            <TextInput
                                sx={{
                                    width: "40%",
                                }}
                                label="Email"
                                required
                                placeholder="exampleuser@example.com"

                                defaultValue={currentSelection.email}
                                error={form.errors.email && "Please specify valid email"}
                                onChange={(event) =>
                                    form.setFieldValue("email", event.currentTarget.value)
                                }
                            />
                            <TextInput
                                sx={{
                                    width: "40%",
                                }}
                                label="Mobile"
                                required
                                placeholder="+8801*********"
                                defaultValue={currentSelection.phone}
                                onChange={(event) =>
                                    form.setFieldValue("phone", event.currentTarget.value)
                                }
                            />
                            <NumberInput
                                sx={{
                                    width: "20%",
                                }}
                                label="Age"
                                placeholder="Age"
                                min={0}
                                max={100}
                                defaultValue={currentSelection.age}
                                onChange={(value) => form.setFieldValue("age", value)}
                            />
                        </Paper>

                        <Paper
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                            }}
                        >
                            <NativeSelect
                                sx={{
                                    width: "30%",
                                }}
                                label="Select Blood Group"
                                placeholder="please select your blood group"
                                data={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                                rightSection={<IconChevronDown size={14} />}
                                rightSectionWidth={40}
                                defaultValue={currentSelection.bloodGroup}
                                onChange={(e) =>
                                    form.setFieldValue("bloodGroup", e.currentTarget.value)
                                }
                            />
                            <Radio.Group
                                sx={{
                                    width: "50%",
                                }}
                                label="Select your Gender"
                                required
                                defaultValue={currentSelection.gender}
                                onChange={(value) => form.setFieldValue("gender", value)}
                            >
                                <Radio value="male" label="Male" />
                                <Radio value="female" label="Female" />
                                <Radio value="other" label="Prefer not to say" />
                            </Radio.Group>
                        </Paper>
                    </Paper>
                    <Paper>
                        <Text component="h2">Patient Address</Text>
                        <Grid>
                            <Grid.Col span={4}>
                                <TextInput
                                    label="Country"
                                    required
                                    placeholder="Country"
                                    // value={form.values.country}
                                    defaultValue={currentSelection.country}
                                    onChange={(event) =>
                                        form.setFieldValue("country", event.currentTarget.value)
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <TextInput
                                    label="City"
                                    required
                                    placeholder="City"
                                    defaultValue={currentSelection.city}
                                    onChange={(event) =>
                                        form.setFieldValue("city", event.currentTarget.value)
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <TextInput
                                    label="Address"
                                    required
                                    placeholder="Address"
                                    // value={form.values.address}
                                    defaultValue={currentSelection.address}
                                    onChange={(event) =>
                                        form.setFieldValue("address", event.currentTarget.value)
                                    }
                                />
                            </Grid.Col>
                        </Grid>
                    </Paper>
                    <Paper>
                        <Text component="h2">Appointment Details</Text>
                        <Grid grow>
                            <Grid.Col span={4}>
                                <TextInput
                                    label="Appointment Date"
                                    required
                                    placeholder="Appointment Date"
                                    defaultValue={currentSelection.appointmentDate}
                                    // value={form.values.appointmentDate}
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            "appointmentDate",
                                            event.currentTarget.value
                                        )
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <TextInput
                                    label="Approximate Relese Date"
                                    required
                                    placeholder="Approximate Relese Date"
                                    defaultValue={currentSelection.releseDate}
                                    // value={form.values.releseDate}
                                    onChange={(event) =>
                                        form.setFieldValue("releseDate", event.currentTarget.value)
                                    }
                                />
                            </Grid.Col>
                        </Grid>
                    </Paper>


                    <Paper padding="sm">
                        <Button
                            mt='md'
                            className="signup-button"
                            size="lg"
                            onClick={() => mutate(form.values)}
                        >
                            Update Information
                        </Button>
                    </Paper>
                </Paper>
            </Modal>
        </>
    )
}

export default EditUser;