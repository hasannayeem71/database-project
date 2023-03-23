import {
  Anchor,
  Box,
  Button,
  Checkbox,
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
import React, { useState } from "react";
import "./style.css";
const PostUser = () => {
  const [opened, setOpened] = useState(false);

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
      termsOfService: false,
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  const handleSubmit = (data) => {
    return axios.post(`http://localhost:5000/userinfo`, {
      ...data,
    });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(handleSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("userinfo");
      setOpened(false);
      form.setFieldValue("firstName", "");
      form.setFieldValue("lastName", "");
      form.setFieldValue("address", "");
      form.setFieldValue("country", "");
      form.setFieldValue("city", "");
      form.setFieldValue("email", "");
      form.setFieldValue("phone", "");
      form.setFieldValue("age", "");
      form.setFieldValue("appointmentDate", "");
      form.setFieldValue("releseDate", "");
      form.setFieldValue("gender", "");
    },
    onError: (error) => {
      queryClient.invalidateQueries("userinfo");
    },
  });

  return (
    <>
      <Box
        sx={{
          padding: "1rem",
          position: "fixed",
          bottom: "5%",
          right: "2%",
        }}
      >
        <Button onClick={() => setOpened(true)}>Add Patient Infromation</Button>
      </Box>

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
                value={form.values.firstName}
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
                value={form.values.lastName}
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
                value={form.values.email}
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
                value={form.values.phone}
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
                value={form.values.age}
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
                value={form.values.bloodGroup}
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
                value={form.values.gender}
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
                  value={form.values.country}
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
                  value={form.values.city}
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
                  value={form.values.address}
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
                  value={form.values.appointmentDate}
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
                  value={form.values.releseDate}
                  onChange={(event) =>
                    form.setFieldValue("releseDate", event.currentTarget.value)
                  }
                />
              </Grid.Col>
            </Grid>
          </Paper>

          <Paper>
            <Text component="h2">Terms of Service</Text>
            <Paper className="terms-wrap" padding="sm">
              <Checkbox
                required
                checked={form.values.termsOfService}
                onChange={(event) =>
                  form.setFieldValue(
                    "termsOfService",
                    !form.values.termsOfService
                  )
                }
              />
              <Text className="terms-label">
                I agree to the <Anchor>Terms of Use</Anchor>
              </Text>
            </Paper>
          </Paper>
          <Paper padding="sm">
            <Button
              className="signup-button"
              size="lg"
              onClick={() => mutate(form.values)}
            >
              Save Information
            </Button>
          </Paper>
        </Paper>
      </Modal>
    </>
  );
};

export default PostUser;
