import React from "react";

const Onboarding = () => {
  return (
    <div className="w-full flex flex-col gap-y-10">
      <div className="">
        <h1 className="font-bold text-3xl">Set Up Your Church Profile</h1>
        <p className="text-[#A3A3A3] font-normal">
          Complete the following form to create your church profile
        </p>
      </div>
      <form className="w-full flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Church Details</h1>
          <label htmlFor="name" className="font-normal text-xs">
            Church Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            // value={values.name}
            // onBlur={handleBlur}
            // onChange={handleChange}
            className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
          />
          {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
          <label htmlFor="location" className="font-normal text-xs">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            // value={values.name}
            // onBlur={handleBlur}
            // onChange={handleChange}
            className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
          />
          {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
          <div className="w-full flex gap-x-3">
            <div className="">
              <label htmlFor="region" className="font-normal text-xs">
                Region
              </label>
              <input
                id="region"
                name="region"
                type="text"
                // value={values.name}
                // onBlur={handleBlur}
                // onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
              />
              {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
            </div>
            <div className="">
              <label htmlFor="district" className="font-normal text-xs">
                District
              </label>
              <input
                id="district"
                name="district"
                type="text"
                // value={values.name}
                // onBlur={handleBlur}
                // onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
              />
              {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Contact Information</h1>
          <div className="w-full flex gap-x-3">
            <div className="">
              <label htmlFor="phone" className="font-normal text-xs">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                // value={values.name}
                // onBlur={handleBlur}
                // onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
              />
              {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
            </div>
            <div className="">
              <label htmlFor="email" className="font-normal text-xs">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                // value={values.name}
                // onBlur={handleBlur}
                // onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
              />
              {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Administrator Details</h1>
          <div className="w-full flex gap-x-3">
            <div className="">
              <label htmlFor="pastor-name" className="font-normal text-xs">
                Pastor's Name
              </label>
              <input
                id="pastor-name"
                name="pastor-name"
                type="text"
                // value={values.name}
                // onBlur={handleBlur}
                // onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
              />
              {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
            </div>
            <div className="">
              <label htmlFor="pastor-phone" className="font-normal text-xs">
                Pastor's Phone
              </label>
              <input
                id="pastor-phone"
                name="pastor-phone"
                type="text"
                // value={values.name}
                // onBlur={handleBlur}
                // onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
              />
              {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
            </div>
          </div>
          <label htmlFor="pastor-email" className="font-normal text-xs">
            Pastor's Email
          </label>
          <input
            id="pastor-email"
            name="pastor-email"
            type="email"
            // value={values.name}
            // onBlur={handleBlur}
            // onChange={handleChange}
            className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal `}
          />
          {/* {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )} */}
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
