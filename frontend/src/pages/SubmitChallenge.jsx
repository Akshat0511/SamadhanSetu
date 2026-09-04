import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Image,
  Loader2,
  Send,
  X,
} from "lucide-react";

import "./SubmitChallenge.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const INITIAL_FORM = {
  title: "",
  description: "",
  category: "",
  district: "",
  location: "",
  priority: "MEDIUM",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

const CATEGORIES = [
  "EDUCATION",
  "HEALTHCARE",
  "AGRICULTURE",
  "WATER_MANAGEMENT",
  "SANITATION",
  "ENVIRONMENT",
  "RURAL_LIVELIHOODS",
  "ACCESSIBILITY",
  "URBAN_INFRASTRUCTURE",
  "PUBLIC_SERVICE",
  "OTHER",
];

const DISTRICTS = [
  "Ranchi",
  "Bokaro",
  "Dhanbad",
  "East Singhbhum",
  "West Singhbhum",
  "Hazaribagh",
  "Giridih",
  "Ramgarh",
  "Deoghar",
  "Dumka",
  "Godda",
  "Gumla",
  "Khunti",
  "Koderma",
  "Latehar",
  "Lohardaga",
  "Pakur",
  "Palamu",
  "Garhwa",
  "Jamtara",
  "Sahibganj",
  "Seraikela Kharsawan",
  "Simdega",
  "Chatra",
];

function SubmitChallenge() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState(INITIAL_FORM);

  const [selectedImages, setSelectedImages] =
    useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /*
  =====================================================
  AUTO-FILL LOGGED-IN USER DETAILS
  =====================================================
  */

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser =
        localStorage.getItem("user");

      if (!token) {
        setError(
          "Please login before submitting a challenge."
        );

        return;
      }

      if (storedUser) {
        const user = JSON.parse(storedUser);

        setFormData((previous) => ({
          ...previous,

          contactName:
            user.name || previous.contactName,

          contactEmail:
            user.email || previous.contactEmail,

          contactPhone:
            user.phone || previous.contactPhone,

          district:
            user.district || previous.district,
        }));
      }
    } catch (err) {
      console.error(
        "AUTH DATA ERROR:",
        err
      );
    }
  }, []);

  /*
  =====================================================
  HANDLE INPUT CHANGE
  =====================================================
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  /*
  =====================================================
  HANDLE IMAGE SELECTION
  =====================================================
  */

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    if (files.length > 5) {
      setError(
        "You can upload maximum 5 images."
      );

      e.target.value = "";
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError(
          "Only image files are allowed."
        );

        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError(
          "Each image must be smaller than 5 MB."
        );

        e.target.value = "";
        return;
      }
    }

    setSelectedImages(files);
    setError("");
  };

  /*
  =====================================================
  REMOVE IMAGE
  =====================================================
  */

  const removeImage = (index) => {
    setSelectedImages((previous) =>
      previous.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  /*
  =====================================================
  VALIDATE FORM
  =====================================================
  */

  const validateForm = () => {
    const title =
      formData.title.trim();

    const description =
      formData.description.trim();

    const contactName =
      formData.contactName.trim();

    const contactEmail =
      formData.contactEmail.trim();

    const contactPhone =
      formData.contactPhone.trim();

    if (!title) {
      return "Please enter the challenge title.";
    }

    if (title.length < 5) {
      return (
        "Challenge title must contain at least 5 characters."
      );
    }

    if (!description) {
      return "Please describe the problem.";
    }

    if (description.length < 20) {
      return (
        "Problem description must contain at least 20 characters."
      );
    }

    if (!formData.category) {
      return "Please select a category.";
    }

    if (!formData.district) {
      return "Please select a district.";
    }

    if (!contactName) {
      return "Please enter your name.";
    }

    if (!contactEmail) {
      return "Please enter your email address.";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(contactEmail)) {
      return "Please enter a valid email address.";
    }

    if (contactPhone) {
      const phoneRegex =
        /^[+]?[0-9\s-]{10,15}$/;

      if (!phoneRegex.test(contactPhone)) {
        return "Please enter a valid phone number.";
      }
    }

    return null;
  };

  /*
  =====================================================
  SUBMIT CHALLENGE
  =====================================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setSuccess("");

    /*
    ===================================================
    VALIDATE FORM
    ===================================================
    */

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /*
    ===================================================
    GET JWT TOKEN
    ===================================================
    */

    const token =
      localStorage.getItem("token");

    console.log(
      "SUBMIT CHALLENGE TOKEN:",
      token
        ? "Token found"
        : "Token NOT found"
    );

    if (!token) {
      setError(
        "You are not logged in. Please login first."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

      return;
    }

    try {
      setLoading(true);

      /*
      =================================================
      STEP 1: CREATE CHALLENGE
      =================================================
      */

      const response = await fetch(
        `${API_URL}/challenges`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            title:
              formData.title.trim(),

            description:
              formData.description.trim(),

            category:
              formData.category,

            district:
              formData.district,

            location:
              formData.location.trim(),

            priority:
              formData.priority,

            contactName:
              formData.contactName.trim(),

            contactEmail:
              formData.contactEmail.trim(),

            contactPhone:
              formData.contactPhone.trim(),
          }),
        }
      );

      /*
      =================================================
      READ CHALLENGE RESPONSE
      =================================================
      */

      let data = {};

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error(
          "JSON RESPONSE ERROR:",
          jsonError
        );
      }

      console.log(
        "SUBMIT CHALLENGE RESPONSE:",
        data
      );

      /*
      =================================================
      TOKEN ERROR
      =================================================
      */

      if (response.status === 401) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        setError(
          "Your login session has expired. Please login again."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      /*
      =================================================
      OTHER SERVER ERRORS
      =================================================
      */

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to submit challenge."
        );
      }

      /*
      =================================================
      GET CREATED CHALLENGE ID
      =================================================
      */

      const challengeId =
        data.challenge?.id ||
        data.data?.challenge?.id ||
        data.data?.id ||
        data.challengeId ||
        data.id;

      console.log(
        "CREATED CHALLENGE ID:",
        challengeId
      );

      /*
      =================================================
      STEP 2: UPLOAD IMAGES
      =================================================
      */

      if (selectedImages.length > 0) {
        if (!challengeId) {
          throw new Error(
            "Challenge was created, but challenge ID was not returned by the server."
          );
        }

        const imageFormData =
          new FormData();

        selectedImages.forEach(
          (file) => {
            imageFormData.append(
              "images",
              file
            );
          }
        );

        const imageResponse =
          await fetch(
            `${API_URL}/challenges/${challengeId}/images`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              body: imageFormData,
            }
          );

        let imageData = {};

        try {
          imageData =
            await imageResponse.json();
        } catch (jsonError) {
          console.error(
            "IMAGE RESPONSE ERROR:",
            jsonError
          );
        }

        console.log(
          "IMAGE UPLOAD RESPONSE:",
          imageData
        );

        if (!imageResponse.ok) {
          throw new Error(
            imageData.message ||
              "Challenge was created, but image upload failed."
          );
        }
      }

      /*
      =================================================
      SUCCESS
      =================================================
      */

      setSuccess(
        selectedImages.length > 0
          ? "Challenge and photos submitted successfully!"
          : data.message ||
              "Challenge submitted successfully!"
      );

      /*
      =================================================
      RESET FORM
      =================================================
      */

      setFormData(INITIAL_FORM);
      setSelectedImages([]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      /*
      =================================================
      REDIRECT
      =================================================
      */

      setTimeout(() => {
        navigate("/challenges");
      }, 2000);
    } catch (err) {
      console.error(
        "SUBMIT CHALLENGE ERROR:",
        err
      );

      if (
        err instanceof TypeError
      ) {
        setError(
          "Cannot connect to backend. Make sure your Node.js server is running on port 5000."
        );
      } else {
        setError(
          err.message ||
            "Something went wrong while submitting the challenge."
        );
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <div className="submit-page">
      <main className="submit-main">
        <div className="submit-container">

          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="back-button"
            disabled={loading}
          >
            <ArrowLeft size={17} />
            Back
          </button>

          {/* HEADER */}

          <div className="submit-header">
            <div className="submit-icon">
              <Send size={25} />
            </div>

            <h1>
              Submit a Community Challenge
            </h1>

            <p>
              Help us identify real problems
              in Jharkhand. Your challenge
              will be evaluated and connected
              with universities, industries
              and experts who can work towards
              a practical solution.
            </p>
          </div>

          {/* SUCCESS */}

          {success && (
            <div className="message success-message">
              <CheckCircle2 size={21} />

              <div>
                <p className="message-title">
                  Challenge Submitted
                </p>

                <p>
                  {success}
                </p>

                <small>
                  Redirecting to challenges...
                </small>
              </div>
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="message error-message">
              <AlertCircle size={21} />

              <div>
                <p className="message-title">
                  Submission Failed
                </p>

                <p>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="challenge-form"
          >

            {/* ================================
                CHALLENGE INFORMATION
            ================================= */}

            <div className="form-section">

              <div className="section-heading">
                <h2>
                  Challenge Information
                </h2>

                <p>
                  Tell us about the problem
                  faced by your community.
                </p>
              </div>

              <div className="form-grid">

                {/* TITLE */}

                <div className="form-group full-width">

                  <label htmlFor="title">
                    Challenge Title
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={
                      formData.title
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Example: Lack of clean drinking water in rural villages"
                    maxLength={150}
                    disabled={loading}
                  />

                  <p className="character-count">
                    {
                      formData.title
                        .length
                    }
                    /150 characters
                  </p>

                </div>

                {/* DESCRIPTION */}

                <div className="form-group full-width">

                  <label htmlFor="description">
                    Problem Description
                    <span className="required">
                      *
                    </span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Describe the problem, who is affected, how often it occurs and why it needs to be solved..."
                    rows={7}
                    maxLength={2000}
                    disabled={loading}
                  />

                  <p className="character-count">
                    {
                      formData.description
                        .length
                    }
                    /2000 characters
                  </p>

                </div>

                {/* CATEGORY */}

                <div className="form-group">

                  <label htmlFor="category">
                    Category
                    <span className="required">
                      *
                    </span>
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleChange
                    }
                    disabled={loading}
                  >

                    <option value="">
                      Select category
                    </option>

                    {CATEGORIES.map(
                      (category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category.replaceAll(
                            "_",
                            " "
                          )}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* PRIORITY */}

                <div className="form-group">

                  <label htmlFor="priority">
                    Priority
                  </label>

                  <select
                    id="priority"
                    name="priority"
                    value={
                      formData.priority
                    }
                    onChange={
                      handleChange
                    }
                    disabled={loading}
                  >

                    <option value="LOW">
                      Low
                    </option>

                    <option value="MEDIUM">
                      Medium
                    </option>

                    <option value="HIGH">
                      High
                    </option>

                    <option value="CRITICAL">
                      Critical
                    </option>

                  </select>

                </div>

                {/* DISTRICT */}

                <div className="form-group">

                  <label htmlFor="district">
                    District
                    <span className="required">
                      *
                    </span>
                  </label>

                  <select
                    id="district"
                    name="district"
                    value={
                      formData.district
                    }
                    onChange={
                      handleChange
                    }
                    disabled={loading}
                  >

                    <option value="">
                      Select district
                    </option>

                    {DISTRICTS.map(
                      (district) => (
                        <option
                          key={district}
                          value={district}
                        >
                          {district}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* LOCATION */}

                <div className="form-group">

                  <label htmlFor="location">
                    Specific Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={
                      formData.location
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Village, block, ward or locality"
                    disabled={loading}
                  />

                </div>

                {/* ================================
                    IMAGE UPLOAD
                ================================= */}

                <div className="form-group full-width image-upload-group">

                  <label>
                    Challenge Photos
                  </label>

                  <p className="image-upload-description">
                    Upload photos that help
                    explain the problem.
                    You can upload up to 5
                    images, maximum 5 MB each.
                  </p>

                  <label
                    htmlFor="challengeImages"
                    className="image-upload-box"
                  >
                    <Image size={30} />

                    <span className="image-upload-title">
                      Click to upload photos
                    </span>

                    <span className="image-upload-subtitle">
                      JPG, PNG, WEBP • Maximum
                      5 images
                    </span>
                  </label>

                  <input
                    id="challengeImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={
                      handleImageChange
                    }
                    disabled={loading}
                    className="image-file-input"
                  />

                  {/* IMAGE PREVIEWS */}

                  {selectedImages.length >
                    0 && (
                    <div className="image-preview-grid">

                      {selectedImages.map(
                        (file, index) => (
                          <div
                            className="image-preview-card"
                            key={`${file.name}-${index}`}
                          >

                            <img
                              src={URL.createObjectURL(
                                file
                              )}
                              alt={`Challenge photo ${
                                index + 1
                              }`}
                            />

                            <button
                              type="button"
                              className="remove-image-button"
                              onClick={() =>
                                removeImage(
                                  index
                                )
                              }
                              disabled={
                                loading
                              }
                              aria-label={`Remove image ${
                                index + 1
                              }`}
                            >
                              <X size={16} />
                            </button>

                            <span>
                              {file.name}
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

              </div>
            </div>

            <div className="form-divider" />

            {/* ================================
                CONTACT INFORMATION
            ================================= */}

            <div className="form-section">

              <div className="section-heading">

                <h2>
                  Contact Information
                </h2>

                <p>
                  Provide your details so the
                  team can contact you if more
                  information is required.
                </p>

              </div>

              <div className="form-grid">

                {/* NAME */}

                <div className="form-group full-width">

                  <label htmlFor="contactName">
                    Your Name
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={
                      formData.contactName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your full name"
                    disabled={loading}
                  />

                </div>

                {/* EMAIL */}

                <div className="form-group">

                  <label htmlFor="contactEmail">
                    Email Address
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={
                      formData.contactEmail
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="you@example.com"
                    disabled={loading}
                  />

                </div>

                {/* PHONE */}

                <div className="form-group">

                  <label htmlFor="contactPhone">
                    Phone Number
                  </label>

                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={
                      formData.contactPhone
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="+91 XXXXX XXXXX"
                    disabled={loading}
                  />

                </div>

              </div>
            </div>

            {/* INFO BOX */}

            <div className="info-box">

              <AlertCircle size={20} />

              <div>

                <p className="info-title">
                  What happens next?
                </p>

                <ul>

                  <li>
                    Your challenge will be
                    reviewed by the
                    SamadhanSetu team.
                  </li>

                  <li>
                    AI will analyze the
                    challenge category,
                    priority and required
                    skills.
                  </li>

                  <li>
                    Suitable universities
                    and industry partners
                    can then be recommended.
                  </li>

                  <li>
                    Selected teams can work
                    together on a solution.
                  </li>

                </ul>

              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/challenges"
                  )
                }
                disabled={loading}
                className="cancel-button"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="spin"
                    />

                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={17} />

                    Submit Challenge
                  </>
                )}

              </button>

            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

export default SubmitChallenge;