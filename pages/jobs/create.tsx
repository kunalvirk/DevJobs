import Masthead from "@components/layout/masthead/Masthead";
import Loading from "@components/loading/Loading";
import { SEO } from "@components/seo/SEO";
import { Authenticated } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import React, { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import slugify from "react-slugify";
import sanitize from "sanitize-html";
import { useLoggedIn } from "src/hooks/useLoggedIn";
import { IJobRow } from "src/interfaces/interface";


const JobCreate = () => {
  const [description, setDescription] = useState("");
  const { user, profile, isLoading, isError } = useLoggedIn();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IJobRow>();

  useEffect(() => {
    setValue("postedby", profile?.id);
  }, [user]);

  const submitData = (data: any) => {
    onFinish(data)
      .then((d) => {
        toast("Job created successfully");
      })
      .catch((e) => {
        toast("Error while creating job");
      });
  };

  return (
    <>
      <Authenticated loading={<Loading />}>
        <Masthead title="Post a job" />
        <div className="container mx-auto">
          <div className="intro-text">
            <p className="text-center">
              Find the best talent from around the world on the most exclusive
              job board on the internet.
            </p>
          </div>

          {/* Render the form here */}
          <div className="job-create flex justify-center">
            <form
              onSubmit={handleSubmit(submitData)}
              className="flex flex-wrap gap-y-4 w-full max-w-2xl bg-white rounded shadow-lg p-4 px-4 mt-8 md:p-8 mb-6"
            >
              {/* Company details */}
              <div className="mb-4 w-full">
                <div className="job-create-section-title font-semibold text-lg">
                  <span className="text-primary-500">1. </span> About Company
                </div>
                <div className="job-create-section-form gap-y-4 flex flex-col mt-4">
                  <div>
                    <label htmlFor="companyname" className="text-sm">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyname"
                      {...register("companyname", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.companyname && (
                      <span className="text-red-600 text-sm">
                        What is the name of the company?
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="companylocation" className="text-sm">
                      Company Location *
                    </label>
                    <input
                      type="text"
                      id="companylocation"
                      {...register("companylocation", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.companylocation && (
                      <span className="text-red-600 text-sm">
                        A brief address of the company
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="companycountry" className="text-sm">
                      Country *
                    </label>
                    <select
                      id="companycountry"
                      {...register("companycountry", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Select country</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                      <option value="AG">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AG">Antigua &amp; Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AA">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia</option>
                      <option value="BL">Bonaire</option>
                      <option value="BA">Bosnia &amp; Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BR">Brazil</option>
                      <option value="BC">British Indian Ocean Ter</option>
                      <option value="BN">Brunei</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="IC">Canary Islands</option>
                      <option value="CV">Cape Verde</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CD">Channel Islands</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CI">Christmas Island</option>
                      <option value="CS">Cocos Island</option>
                      <option value="CO">Colombia</option>
                      <option value="CC">Comoros</option>
                      <option value="CG">Congo</option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="CT">Cote D'Ivoire</option>
                      <option value="HR">Croatia</option>
                      <option value="CU">Cuba</option>
                      <option value="CB">Curacao</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="TM">East Timor</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FA">Falkland Islands</option>
                      <option value="FO">Faroe Islands</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="GF">French Guiana</option>
                      <option value="PF">French Polynesia</option>
                      <option value="FS">French Southern Ter</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GB">Great Britain</option>
                      <option value="GR">Greece</option>
                      <option value="GL">Greenland</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GU">Guam</option>
                      <option value="GT">Guatemala</option>
                      <option value="GN">Guinea</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HW">Hawaii</option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IA">Iran</option>
                      <option value="IQ">Iraq</option>
                      <option value="IR">Ireland</option>
                      <option value="IM">Isle of Man</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="NK">Korea North</option>
                      <option value="KS">Korea South</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">Laos</option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MO">Macau</option>
                      <option value="MK">Macedonia</option>
                      <option value="MG">Madagascar</option>
                      <option value="MY">Malaysia</option>
                      <option value="MW">Malawi</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="ME">Mayotte</option>
                      <option value="MX">Mexico</option>
                      <option value="MI">Midway Islands</option>
                      <option value="MD">Moldova</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Nambia</option>
                      <option value="NU">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="AN">Netherland Antilles</option>
                      <option value="NL">Netherlands (Holland, Europe)</option>
                      <option value="NV">Nevis</option>
                      <option value="NC">New Caledonia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NW">Niue</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PW">Palau Island</option>
                      <option value="PS">Palestine</option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PO">Pitcairn Island</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="ME">Republic of Montenegro</option>
                      <option value="RS">Republic of Serbia</option>
                      <option value="RE">Reunion</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russia</option>
                      <option value="RW">Rwanda</option>
                      <option value="NT">St Barthelemy</option>
                      <option value="EU">St Eustatius</option>
                      <option value="HE">St Helena</option>
                      <option value="KN">St Kitts-Nevis</option>
                      <option value="LC">St Lucia</option>
                      <option value="MB">St Maarten</option>
                      <option value="PM">St Pierre &amp; Miquelon</option>
                      <option value="VC">St Vincent &amp; Grenadines</option>
                      <option value="SP">Saipan</option>
                      <option value="SO">Samoa</option>
                      <option value="AS">Samoa American</option>
                      <option value="SM">San Marino</option>
                      <option value="ST">Sao Tome &amp; Principe</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="OI">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SZ">Swaziland</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syria</option>
                      <option value="TA">Tahiti</option>
                      <option value="TW">Taiwan</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania</option>
                      <option value="TH">Thailand</option>
                      <option value="TG">Togo</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad &amp; Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TU">Turkmenistan</option>
                      <option value="TC">Turks &amp; Caicos Is</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States of America</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VS">Vatican City State</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Vietnam</option>
                      <option value="VB">Virgin Islands (Brit)</option>
                      <option value="VA">Virgin Islands (USA)</option>
                      <option value="WK">Wake Island</option>
                      <option value="WF">Wallis &amp; Futana Is</option>
                      <option value="YE">Yemen</option>
                      <option value="ZR">Zaire</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                    </select>
                    {errors.companycountry && (
                      <span className="text-red-600 text-sm">
                        In which country this is located?
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Job role details */}
              <div className="mb-4 w-full">
                <div className="job-create-section-title font-semibold text-lg">
                  <span className="text-primary-500">2. </span> Job role
                </div>
                <div className="job-create-section-form gap-y-4 flex flex-col mt-4">
                  <div>
                    <label htmlFor="positionname" className="text-sm">
                      Position Name *
                    </label>
                    <input
                      type="text"
                      id="positionname"
                      {...register("positionname", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      onChange={(e) =>
                        setValue("slug", slugify(e.target.value))
                      }
                    />
                    {errors.positionname && (
                      <span className="text-red-600 text-sm">
                        What designation you are hiring for?
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="jobcategory" className="text-sm">
                      Category *
                    </label>
                    <select
                      id="jobcategory"
                      {...register("jobcategory", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Select a category</option>
                      <option value="Full Stack Programming">
                        Full Stack Programming
                      </option>
                      <option value="Back-End Programming">
                        Back-End Programming
                      </option>
                      <option value="Front-End Programming">
                        Front-End Programming
                      </option>
                      <option value="Devops & Sysadmin">
                        Devops & Sysadmin
                      </option>
                    </select>
                    {errors.jobcategory && (
                      <span className="text-red-600 text-sm">
                        Select the most appropriate
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="jobtype" className="text-sm">
                      Commitment *
                    </label>
                    <select
                      id="jobtype"
                      {...register("jobtype", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                    {errors.jobtype && (
                      <span className="text-red-600 text-sm">
                        What type of role will this be?
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="experience" className="text-sm">
                      Experience *
                    </label>
                    <select
                      id="experience"
                      {...register("experience", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Select...</option>
                      <option value="Tech-lead">Tech-lead</option>
                      <option value="Senior">Senior</option>
                      <option value="Mid-senior">Mid-senior</option>
                      <option value="Junior">Junior</option>
                    </select>
                    {errors.experience && (
                      <span className="text-red-600 text-sm">
                        Select the relevant experience required
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="experience" className="text-sm">
                      Application URL *
                    </label>
                    <input
                      type="text"
                      id="applicationlink"
                      {...register("applicationlink", {
                        required: {
                          value: true,
                          message: "Where to apply?",
                        },
                        pattern: {
                          value:
                            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
                          message: "Enter a valid URL",
                        },
                      })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.applicationlink && (
                      <span className="text-red-600 text-sm">
                        {String(errors.applicationlink?.message) ?? "Enter a valid URL"}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="jobdescription" className="text-sm">
                      Description *
                    </label>
                    <EditorProvider>
                      <Editor
                        value={description}
                        onChange={(e) => {
                          setValue("jobdescription", sanitize(e.target.value));
                          setDescription(sanitize(e.target.value));
                        }}
                      >
                        <Toolbar>
                          <BtnUndo />
                          <BtnRedo />
                          <Separator />
                          <BtnBold />
                          <BtnItalic />
                          <BtnUnderline />
                          <BtnStrikeThrough />
                          <Separator />
                          <BtnNumberedList />
                          <BtnBulletList />
                          <Separator />
                          <BtnLink />
                          <BtnClearFormatting />
                          <HtmlButton />
                          <Separator />
                          <BtnStyles />
                        </Toolbar>
                      </Editor>
                    </EditorProvider>
                    {errors.jobdescription && (
                      <span className="text-red-600 text-sm">
                        A good description is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="isremote" className="text-sm">
                      Is Remote? *
                    </label>
                    <div className="mt-1 flex gap-3">
                      <div className="inline-flex gap-1">
                        <input
                          type="radio"
                          id="isremote_yes"
                          {...register("isremote", { required: true })}
                          value="1"
                          checked={true}
                        />
                        <label htmlFor="isremote_yes" className="text-sm">
                          Yes
                        </label>
                      </div>
                      <div className="inline-flex gap-1">
                        <input
                          type="radio"
                          id="isremote_no"
                          {...register("isremote", { required: true })}
                          value="1"
                        />
                        <label htmlFor="isremote_no" className="text-sm">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="joblocation" className="text-sm">
                      Preferred Location *
                    </label>
                    <select
                      id="joblocation"
                      {...register("joblocation", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia">Asia</option>
                      <option value="Africa">Africa</option>
                      <option value="Australia">Australia</option>
                      <option value="South America">South America</option>
                      <option value="Worldwide">Worldwide</option>
                    </select>
                    {errors.joblocation && (
                      <span className="text-red-600 text-sm">
                        Select the relevant options
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="salary" className="text-sm">
                      Salary{" "}
                      <span className="text-sm text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="salary"
                      {...register("salary")}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="salary" className="text-sm">
                      Tags *
                    </label>
                    <input
                      type="text"
                      id="tags"
                      {...register("tags", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    <span className="text-xs text-gray-400">
                      Example: javascript, python, nodejs, expressjs
                    </span>
                    {errors.tags && (
                      <span className="text-red-600 text-sm block">
                        Enter tags for better visibility
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                  >
                    {/* {formLoading && <div>Loading...</div>} */}
                    <span>Post Job</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <SEO title="Post a job" />
      </Authenticated>
    </>
  );
};

export default JobCreate;
