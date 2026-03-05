import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";
import "../styles/Admissions.scss";

const STATES = ["Kerala", "Tamil Nadu", "Karnataka"];

const DISTRICTS = {
  Kerala: [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Tiruppur",
    "Ranipet",
    "Vellore",
    "Erode",
    "Thoothukkudi",
    "Dindigul",
    "Thanjavur",
    "Kancheepuram",
    "Chengalpattu",
    "Villupuram",
    "Cuddalore",
    "Nagapattinam",
    "Tiruvarur",
    "Pudukkottai",
    "Sivaganga",
    "Virudhunagar",
    "Ramanathapuram",
    "Tenkasi",
    "Krishnagiri",
    "Dharmapuri",
    "Namakkal",
    "Perambalur",
    "Ariyalur",
    "Kallakurichi",
    "Tirupattur",
    "Nilgiris",
    "Karur",
    "Mayiladuthurai",
    "Tiruvannamalai",
    "Kanyakumari",
  ],
  Karnataka: [
    "Bengaluru Urban",
    "Bengaluru Rural",
    "Mysuru",
    "Mangaluru",
    "Belagavi",
    "Ballari",
    "Vijayapura",
    "Kalaburagi",
    "Dharwad",
    "Davanagere",
    "Shivamogga",
    "Tumakuru",
    "Raichur",
    "Bidar",
    "Hassan",
    "Mandya",
    "Udupi",
    "Chikkamagaluru",
    "Kodagu",
    "Chitradurga",
    "Kolar",
    "Chikkaballapura",
    "Ramanagara",
    "Chamarajanagar",
    "Yadgir",
    "Koppal",
    "Gadag",
    "Haveri",
    "Uttara Kannada",
    "Bagalkot",
    "Vijayanagara",
  ],
};

const COUNTRY_CODES = ["+91", "+968", "+966", "+971", "+44", "+1"];

const CLASSES = [
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Plus One",
  "Plus Two",
  "Graduate",
  "Post Graduate",
];

const LANGUAGES = ["Arabic", "English", "Malayalam", "Hindi", "Urdu"];

export default function Admission() {
  const [step, setStep] = useState(1);
  const [program, setProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [toast, setToast] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // WhatsApp related state
  const [whatsappUrl, setWhatsappUrl] = useState(null);
  const [submittedApplicationId, setSubmittedApplicationId] = useState(null);

  // Fetch programs from backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const data = await api.getPrograms();
        // Handle both paginated (results), array, and other response formats
        let programList = [];
        if (Array.isArray(data)) {
          programList = data;
        } else if (data && Array.isArray(data.results)) {
          programList = data.results;
        } else if (data && typeof data === "object") {
          // Handle case where data might be an object with program-like properties
          programList = [];
        }
        setPrograms(programList);
      } catch (err) {
        console.error("Failed to fetch programs:", err);
        setError("Failed to load programs. Please try again.");
        setPrograms([]); // Ensure programs is always an array
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const [form, setForm] = useState({
    studentPhoto: null,
    name: "",
    dob: "",
    age: "",
    phone: "",
    email: "",
    state: "",
    district: "",
    houseName: "",
    place: "",
    postOffice: "",
    zipCode: "",
    madrassaName: "",
    classStopped: "",
    standard: "",
    schoolCollege: "",
    languages: [],
    languageOther: "",
    skills: "",
    interests: "",
    lastBook: "",
    careerNote: "",
    expectations: "",
    achievementsFile: null,
    arabicFluent: "",
    hifzBefore: "",
    hifzAmount: "",
    thahfeezSkills: "",
    thahfeezInterests: "",
    thahfeezComments: "",
    thahfeezAchievements: null,
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianOccupation: "",
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!form.dob) return;
    const dob = new Date(form.dob);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    update("age", age);
  }, [form.dob]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.size <= 10 * 1024 * 1024 &&
      file.type.startsWith("image/")
    ) {
      update("studentPhoto", file);
    } else if (file) {
      alert("File size must be less than 10MB and be an image");
    }
  };

  const handleFileChange = (key, e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      update(key, file);
    } else if (file) {
      alert("File size must be less than 10MB");
    }
  };

  const getSelectedProgram = () => {
    return programs.find((p) => p.slug === program);
  };

  const ageValid = () => {
    const selectedProgram = getSelectedProgram();
    if (!selectedProgram || !form.age) return false;
    return (
      form.age >= selectedProgram.min_age && form.age <= selectedProgram.max_age
    );
  };
  const isAgeErrorVisible = form.dob && !ageValid();

  const step1Valid =
    form.studentPhoto &&
    form.name &&
    form.dob &&
    form.phone &&
    form.email.endsWith("@gmail.com") &&
    form.state &&
    form.district &&
    form.houseName &&
    form.place &&
    form.postOffice &&
    form.zipCode &&
    ageValid();

  const step2Valid =
    form.madrassaName &&
    form.classStopped &&
    form.standard &&
    form.schoolCollege &&
    form.languages.length > 0 &&
    (program === "shareea"
      ? form.skills &&
        form.interests &&
        form.lastBook &&
        form.careerNote &&
        form.expectations
      : form.arabicFluent &&
        form.hifzBefore &&
        form.thahfeezSkills &&
        form.thahfeezInterests &&
        (form.hifzBefore === "no" || form.hifzAmount !== ""));

  const step3Valid =
    form.guardianName &&
    form.guardianRelation &&
    form.guardianPhone &&
    form.guardianEmail.endsWith("@gmail.com") &&
    form.guardianOccupation;

  const toggleLanguage = (lang) => {
    const newLangs = form.languages.includes(lang)
      ? form.languages.filter((l) => l !== lang)
      : [...form.languages, lang];
    update("languages", newLangs);
  };

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const jumpToStep = (targetStep) => {
    if (targetStep <= step) setStep(targetStep);
  };

  // Function to generate WhatsApp message after submission
  const generateWhatsAppMessage = async (admissionId) => {
    try {
      const response = await api.request("/whatsapp/generate_message/", {
        method: "POST",
        body: JSON.stringify({
          admission_id: admissionId,
          message_type: "success",
        }),
        auth: true,
      });

      if (response.whatsapp_url) {
        setWhatsappUrl(response.whatsapp_url);
      }
    } catch (err) {
      console.error("Failed to generate WhatsApp message:", err);
      // Don't show error to user, just continue without WhatsApp
    }
  };

  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      const selectedProgram = getSelectedProgram();
      if (!selectedProgram) {
        throw new Error("Please select a program");
      }

      // Step 1: Create admission with personal info
      const step1Data = {
        student_photo: form.studentPhoto,
        name: form.name,
        dob: form.dob,
        phone: form.phone,
        phone_country_code: countryCode,
        email: form.email,
        address_house_name: form.houseName,
        address_place: form.place,
        address_post_office: form.postOffice,
        address_pin_code: form.zipCode,
        address_state: form.state,
        address_district: form.district,
      };

      const admission = await api.createAdmission({
        program: selectedProgram.id,
        step: 1,
        step_data: step1Data,
        time_spent: 0,
      });

      // Step 2: Complete academic details
      const step2Data = {
        madrassa_name: form.madrassaName,
        class_stopped: form.classStopped,
        school_college: form.schoolCollege,
        standard: form.standard,
        languages_known: form.languages,
        languages_other: form.languageOther,
        ...(program === "shareea"
          ? {
              academic_data: {
                skills: form.skills,
                interests: form.interests,
                last_book: form.lastBook,
                career_note: form.careerNote,
                expectations: form.expectations,
              },
            }
          : {
              academic_data: {
                arabic_fluent: form.arabicFluent,
                hifz_before: form.hifzBefore,
                hifz_amount: form.hifzAmount,
                skills: form.thahfeezSkills,
                interests: form.thahfeezInterests,
                comments: form.thahfeezComments,
              },
            }),
        achievements_file: form.achievementsFile || form.thahfeezAchievements,
      };

      await api.completeStep(admission.id, step2Data, 0);

      // Step 3: Complete guardian info
      const step3Data = {
        guardian_name: form.guardianName,
        guardian_relation: form.guardianRelation,
        guardian_phone: form.guardianPhone,
        guardian_phone_country_code: countryCode,
        guardian_email: form.guardianEmail,
        guardian_occupation: form.guardianOccupation,
      };

      await api.completeStep(admission.id, step3Data, 0);

      // Step 4: Submit admission
      await api.submitAdmission(admission.id);

      // Store the application ID and generate WhatsApp message
      setSubmittedApplicationId(admission.id);

      // Generate WhatsApp message
      await generateWhatsAppMessage(admission.id);

      setToast(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setError(
        err.message || "Failed to submit application. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle WhatsApp redirect
  const handleWhatsAppClick = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank");
    }
  };

  // Handle going to home page
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Navbar />
      <section className="admission-page">
        <div className="container">
          <section className="admission-header">
            <div className="breadcrumbs">
              <a href="/">Home</a> <span>/ Admission</span>
            </div>
            <h1>Admission Portal</h1>
          </section>
          <div className="admission-card">
            {/* Show success screen if submitted */}
            {toast && submittedApplicationId ? (
              <div className="success-screen">
                <div className="success-icon">✅</div>
                <h2>Application Submitted Successfully!</h2>
                <p>
                  Thank you for submitting your application to Zainussunna
                  Academy.
                </p>
                <p className="application-note">
                  Your application has been saved. Our team will contact you
                  shortly.
                </p>

                {/* WhatsApp Button */}
                {whatsappUrl && (
                  <div className="whatsapp-section">
                    <p className="whatsapp-prompt">
                      📱 Share your admission details on WhatsApp for quick
                      communication:
                    </p>
                    <button
                      className="whatsapp-btn"
                      onClick={handleWhatsAppClick}
                    >
                      <span className="whatsapp-icon">💬</span>
                      Open WhatsApp
                    </button>
                  </div>
                )}

                <button className="home-btn" onClick={handleGoHome}>
                  Go to Home Page
                </button>
              </div>
            ) : (
              <>
                <div className="timeline">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`dot ${step >= n ? "done" : ""} ${step === n ? "active" : ""} ${step < n ? "locked" : ""}`}
                      onClick={() => jumpToStep(n)}
                    >
                      {n < step ? "✓" : n}
                    </div>
                  ))}
                  <div className="track">
                    <span style={{ width: `${(step - 1) * 33}%` }}></span>
                  </div>
                </div>

                {step === 1 && (
                  <>
                    <h2>Program & Personal Information</h2>
                    {error && <div className="error-message">{error}</div>}

                    {loading ? (
                      <div className="loading-message">Loading programs...</div>
                    ) : programs.length === 0 ? (
                      <div className="error-message">
                        No programs available. Please try again later.
                      </div>
                    ) : (
                      <div className="programs">
                        {programs.map((p) => (
                          <div
                            key={p.slug}
                            className={`program ${program === p.slug ? "selected" : ""}`}
                            onClick={() => setProgram(p.slug)}
                          >
                            {p.name}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="form two-col">
                      <div className="photo-upload">
                        <label>Student Photo *</label>
                        <div className="photo-input">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload" className="upload-btn">
                            📷 Choose Photo
                          </label>
                          {form.studentPhoto && (
                            <span className="file-name">
                              {form.studentPhoto.name}
                            </span>
                          )}
                        </div>
                        <span className="hint">Max 10MB, Image only</span>
                      </div>
                      <div className="spacer"></div>
                      <div className="form-field name-field">
                        <label>Student Name *</label>
                        <input
                          placeholder="Student Name *"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Date of Birth *</label>
                        <input
                          type="date"
                          value={form.dob}
                          onChange={(e) => update("dob", e.target.value)}
                        />
                        {isAgeErrorVisible && getSelectedProgram() && (
                          <span className="inline-error">
                            Age must be between {getSelectedProgram()?.min_age}{" "}
                            and {getSelectedProgram()?.max_age}
                          </span>
                        )}
                      </div>
                      <div className="form-field">
                        <label>Age</label>
                        <input
                          readOnly
                          placeholder="Age"
                          value={form.age || ""}
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone *</label>
                        <div className="phone-input">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            placeholder="Phone *"
                            value={form.phone}
                            maxLength={10}
                            onChange={(e) => update("phone", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-field">
                        <label>Email *</label>
                        <input
                          type="email"
                          placeholder="Email (@gmail.com) *"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>State *</label>
                        <select
                          value={form.state}
                          onChange={(e) => {
                            update("state", e.target.value);
                            update("district", "");
                          }}
                        >
                          <option value="">Select State *</option>
                          {STATES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label>District *</label>
                        <select
                          key={form.state}
                          value={form.district}
                          disabled={!form.state}
                          onChange={(e) => update("district", e.target.value)}
                        >
                          <option value="">Select District *</option>
                          {DISTRICTS[form.state]?.map((d) => (
                            <option key={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label>House Name *</label>
                        <input
                          placeholder="House Name *"
                          value={form.houseName}
                          onChange={(e) => update("houseName", e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Place *</label>
                        <input
                          placeholder="Place *"
                          value={form.place}
                          onChange={(e) => update("place", e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Post Office *</label>
                        <input
                          placeholder="Post Office *"
                          value={form.postOffice}
                          onChange={(e) => update("postOffice", e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>PIN Code *</label>
                        <input
                          type="text"
                          placeholder="PIN Code *"
                          value={form.zipCode}
                          maxLength={6}
                          onChange={(e) => update("zipCode", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="nav">
                      <button
                        className="primary"
                        disabled={!step1Valid || loading}
                        onClick={next}
                      >
                        {loading ? "Processing..." : "Continue"}
                      </button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2>Academic Details</h2>
                    <div className="form two-col">
                      <div className="form-field">
                        <label>Name of Madrassa / Dars *</label>
                        <input
                          placeholder="Name of Madrassa / Dars *"
                          value={form.madrassaName}
                          onChange={(e) =>
                            update("madrassaName", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-field">
                        <label>Class where study stopped *</label>
                        <select
                          value={form.classStopped}
                          onChange={(e) =>
                            update("classStopped", e.target.value)
                          }
                        >
                          <option value="">Class where study stopped *</option>
                          {CLASSES.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label>School / College studied *</label>
                        <input
                          placeholder="School / College studied *"
                          value={form.schoolCollege}
                          onChange={(e) =>
                            update("schoolCollege", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-field">
                        <label>Standard going to study *</label>
                        <select
                          value={form.standard}
                          onChange={(e) => update("standard", e.target.value)}
                        >
                          <option value="">Standard going to study *</option>
                          {CLASSES.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="languages-group">
                        <label>Languages Known *</label>
                        <div className="checkbox-group">
                          {LANGUAGES.map((lang) => (
                            <label key={lang} className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={form.languages.includes(lang)}
                                onChange={() => toggleLanguage(lang)}
                              />
                              {lang}
                            </label>
                          ))}
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={form.languages.includes("Other")}
                              onChange={() => toggleLanguage("Other")}
                            />
                            Other
                          </label>
                        </div>
                        {form.languages.includes("Other") && (
                          <input
                            placeholder="Specify other languages"
                            value={form.languageOther}
                            onChange={(e) =>
                              update("languageOther", e.target.value)
                            }
                            className="other-input"
                          />
                        )}
                      </div>
                      {program === "shareea" && (
                        <>
                          <div className="form-field">
                            <label>Skills you have *</label>
                            <input
                              placeholder="Skills *"
                              value={form.skills}
                              onChange={(e) => update("skills", e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Interests *</label>
                            <input
                              placeholder="Interests *"
                              value={form.interests}
                              onChange={(e) =>
                                update("interests", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-field">
                            <label>Last book you read *</label>
                            <input
                              placeholder="Last book *"
                              value={form.lastBook}
                              onChange={(e) =>
                                update("lastBook", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-field">
                            <label>Brief note about your career *</label>
                            <input
                              placeholder="Career note *"
                              value={form.careerNote}
                              onChange={(e) =>
                                update("careerNote", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-field full-width">
                            <label>Expectations from academy *</label>
                            <textarea
                              placeholder="Expectations *"
                              value={form.expectations}
                              onChange={(e) =>
                                update("expectations", e.target.value)
                              }
                            />
                          </div>
                          <div className="file-upload">
                            <label
                              className="file-label"
                              htmlFor="achievements-upload"
                            >
                              📎 Upload Achievements (Optional)
                            </label>
                            <input
                              type="file"
                              id="achievements-upload"
                              accept="image/*,.pdf"
                              onChange={(e) =>
                                handleFileChange("achievementsFile", e)
                              }
                            />
                            {form.achievementsFile && (
                              <span className="file-name">
                                {form.achievementsFile.name}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                      {program === "thahfeez" && (
                        <>
                          <div className="form-field">
                            <label>Can you read Arabic fluently? *</label>
                            <select
                              value={form.arabicFluent}
                              onChange={(e) =>
                                update("arabicFluent", e.target.value)
                              }
                            >
                              <option value="">Select fluency level *</option>
                              <option value="no">No - Cannot read</option>
                              <option value="beginning">
                                Beginning - Knows alphabets
                              </option>
                              <option value="elementary">
                                Elementary - Can read words
                              </option>
                              <option value="intermediate">
                                Intermediate - Can read sentences
                              </option>
                              <option value="advanced">
                                Advanced - Can read paragraphs
                              </option>
                              <option value="fluent">
                                Fluent - Can read fluently
                              </option>
                            </select>
                          </div>
                          <div className="form-field">
                            <label>Have you studied Hifz before? *</label>
                            <select
                              value={form.hifzBefore}
                              onChange={(e) => {
                                update("hifzBefore", e.target.value);
                                if (e.target.value === "no")
                                  update("hifzAmount", "");
                              }}
                            >
                              <option value="">Hifz before? *</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                          {form.hifzBefore === "yes" && (
                            <div className="form-field memory-field">
                              <label>How much Quran memorized? *</label>
                              <input
                                placeholder="Juz/Surah *"
                                value={form.hifzAmount}
                                onChange={(e) =>
                                  update("hifzAmount", e.target.value)
                                }
                              />
                            </div>
                          )}
                          <div className="form-field">
                            <label>Skills *</label>
                            <input
                              placeholder="Skills *"
                              value={form.thahfeezSkills}
                              onChange={(e) =>
                                update("thahfeezSkills", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-field">
                            <label>Interests *</label>
                            <input
                              placeholder="Interests *"
                              value={form.thahfeezInterests}
                              onChange={(e) =>
                                update("thahfeezInterests", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-field full-width">
                            <label>Additional comments (Optional)</label>
                            <textarea
                              placeholder="Comments"
                              value={form.thahfeezComments}
                              onChange={(e) =>
                                update("thahfeezComments", e.target.value)
                              }
                            />
                          </div>
                          <div className="file-upload">
                            <label
                              className="file-label"
                              htmlFor="thahfeez-upload"
                            >
                              📎 Upload Achievements (Optional)
                            </label>
                            <input
                              type="file"
                              id="thahfeez-upload"
                              accept="image/*,.pdf"
                              onChange={(e) =>
                                handleFileChange("thahfeezAchievements", e)
                              }
                            />
                            {form.thahfeezAchievements && (
                              <span className="file-name">
                                {form.thahfeezAchievements.name}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="nav">
                      <button
                        className="back-btn"
                        onClick={back}
                        disabled={loading}
                      >
                        Back
                      </button>
                      <button
                        className="primary"
                        disabled={!step2Valid || loading}
                        onClick={next}
                      >
                        {loading ? "Processing..." : "Continue"}
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2>Parent / Guardian Information</h2>
                    <div className="form two-col">
                      <div className="form-field">
                        <label>Guardian Name *</label>
                        <input
                          placeholder="Guardian Name *"
                          value={form.guardianName}
                          onChange={(e) =>
                            update("guardianName", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-field">
                        <label>Relationship *</label>
                        <input
                          placeholder="Relationship *"
                          value={form.guardianRelation}
                          onChange={(e) =>
                            update("guardianRelation", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-field">
                        <label>Contact Number *</label>
                        <div className="phone-input">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            placeholder="Contact *"
                            value={form.guardianPhone}
                            maxLength={10}
                            onChange={(e) =>
                              update("guardianPhone", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="form-field">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          placeholder="Email (@gmail.com) *"
                          value={form.guardianEmail}
                          onChange={(e) =>
                            update("guardianEmail", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-field">
                        <label>Occupation *</label>
                        <input
                          placeholder="Occupation *"
                          value={form.guardianOccupation}
                          onChange={(e) =>
                            update("guardianOccupation", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="nav">
                      <button
                        className="back-btn"
                        onClick={back}
                        disabled={loading}
                      >
                        Back
                      </button>
                      <button
                        className="primary"
                        disabled={!step3Valid || loading}
                        onClick={next}
                      >
                        {loading ? "Processing..." : "Review"}
                      </button>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2>Review Your Application</h2>
                    <div className="review-sections">
                      <div className="review-card">
                        <div className="review-header">
                          <h3>Program</h3>
                          <button
                            className="edit-btn"
                            onClick={() => jumpToStep(1)}
                          >
                            Edit
                          </button>
                        </div>
                        <p>
                          <strong>Program:</strong> {getSelectedProgram()?.name}
                        </p>
                      </div>
                      <div className="review-card">
                        <div className="review-header">
                          <h3>Personal</h3>
                          <button
                            className="edit-btn"
                            onClick={() => jumpToStep(1)}
                          >
                            Edit
                          </button>
                        </div>
                        <p>
                          <strong>Name:</strong> {form.name}
                        </p>
                        <p>
                          <strong>DOB:</strong> {form.dob},{" "}
                          <strong>Age:</strong> {form.age}
                        </p>
                        <p>
                          <strong>Phone:</strong> {countryCode} {form.phone},{" "}
                          <strong>Email:</strong> {form.email}
                        </p>
                        <p>
                          <strong>Address:</strong> {form.houseName},{" "}
                          {form.place}, {form.postOffice} - {form.zipCode}
                        </p>
                        <p>
                          <strong>State:</strong> {form.state},{" "}
                          <strong>District:</strong> {form.district}
                        </p>
                      </div>
                      <div className="review-card">
                        <div className="review-header">
                          <h3>Academic</h3>
                          <button
                            className="edit-btn"
                            onClick={() => jumpToStep(2)}
                          >
                            Edit
                          </button>
                        </div>
                        <p>
                          <strong>Madrassa:</strong> {form.madrassaName},{" "}
                          <strong>Stopped:</strong> {form.classStopped}
                        </p>
                        <p>
                          <strong>Standard:</strong> {form.standard},{" "}
                          <strong>School:</strong> {form.schoolCollege}
                        </p>
                        <p>
                          <strong>Languages:</strong>{" "}
                          {form.languages.join(", ")}
                        </p>
                        {program === "shareea" && (
                          <p>
                            <strong>Skills:</strong> {form.skills},{" "}
                            <strong>Interests:</strong> {form.interests}
                          </p>
                        )}
                        {program === "thahfeez" && (
                          <p>
                            <strong>Arabic:</strong> {form.arabicFluent},{" "}
                            <strong>Hifz Before:</strong> {form.hifzBefore}
                          </p>
                        )}
                      </div>
                      <div className="review-card">
                        <div className="review-header">
                          <h3>Guardian</h3>
                          <button
                            className="edit-btn"
                            onClick={() => jumpToStep(3)}
                          >
                            Edit
                          </button>
                        </div>
                        <p>
                          <strong>Name:</strong> {form.guardianName} (
                          {form.guardianRelation})
                        </p>
                        <p>
                          <strong>Phone:</strong> {countryCode}{" "}
                          {form.guardianPhone}
                        </p>
                        <p>
                          <strong>Email:</strong> {form.guardianEmail}
                        </p>
                        <p>
                          <strong>Occupation:</strong> {form.guardianOccupation}
                        </p>
                      </div>
                    </div>
                    <div className="confirmation-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          checked={confirmationChecked}
                          onChange={(e) =>
                            setConfirmationChecked(e.target.checked)
                          }
                        />
                        I confirm the above information is correct
                      </label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="nav">
                      <button
                        className="back-btn"
                        onClick={back}
                        disabled={loading}
                      >
                        Back
                      </button>
                      <button
                        className="primary"
                        disabled={!confirmationChecked || loading}
                        onClick={submit}
                      >
                        {loading ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      {toast && !submittedApplicationId && (
        <div className="toast">Application submitted successfully!</div>
      )}
      <Footer />
    </>
  );
}
