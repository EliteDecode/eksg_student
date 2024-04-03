import React, { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";
import dashboadImg from "../../assets/icons/dashboard.png";
import { Typography } from "antd";

import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Loader from "@/lib/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DashboardHomePage = () => {
  const { user } = useSelector((state) => state.studentAuth);

  const studentDetails = [
    {
      title: "Firstname",
      value: user?.student?.firstname,
    },
    {
      title: "Lastname/Surname",
      value: user?.student?.surname,
    },
    {
      title: "Othernames",
      value: user?.student?.othername,
    },

    {
      title: "Gender",
      value: user?.student?.gender,
    },
    {
      title: "State of Origin",
      value: user?.student?.state_of_origin,
    },
    {
      title: "LGA",
      value: user?.student?.local_government,
    },
    {
      title: "Date of Birth",
      value: new Date(user?.student?.date_of_birth).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
    },
    {
      title: "Registered At",
      value: new Date(user?.student?.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <Box className="sm:p-5 p-3 relative">
      <Box
        className="flex items-center z-0 space-x-2 bg-white p-5 rounded-md"
        style={{ zIndex: 0 }}>
        <img src={dashboadImg} alt="dashboard icon" className="w-[32px]" />

        <Box>
          <Typography
            className="text-primary text-[15px]"
            style={{ fontWeight: "bold" }}>
            Student Data
          </Typography>
          <Typography className="text-gray-400 -mt-0.5 text-[11px]">
            Showing all data of student
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box className="mt-5">
          <Box className="bg-white my-3 rounded-md p-1.5 shadow-md w-[15%]">
            <img
              src={user?.student?.passport}
              alt="student Image"
              className="rounded-md"
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <Box className="space-y-4">
                    {studentDetails.map((item, index) => (
                      <Box
                        key={index}
                        className="flex  items-center justify-between space-x-2">
                        <Typography className="font-bold text-[14px] text-[#000]">
                          {item.title}:
                        </Typography>
                        <Typography>{item.value}</Typography>
                      </Box>
                    ))}
                    {studentDetails?.student_code != null && (
                      <Box className="flex  items-center justify-between space-x-2">
                        <Typography className="font-bold text-[14px] text-[#000]">
                          Student Exam Number
                        </Typography>
                        <Typography>{studentDetails?.student_code}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <Box className="space-y-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="text-center">
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CA1 Score
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CA2 Score
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {user?.student?.ca_scores?.map((item, index) => {
                          return (
                            <tr key={index} className="hover:bg-gray-100">
                              <td className="px-6 py-4 text-left whitespace-nowrap">
                                {item?.subject_name}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {item?.ca1_score}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {item?.ca2_score}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHomePage;
