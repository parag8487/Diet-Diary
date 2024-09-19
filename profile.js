document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const profileDisplay = document.getElementById("profileDisplay");
    const editProfileBtn = document.getElementById("editProfile");
    
    // Get profile elements
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const sexInput = document.getElementById("sex");
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
  
    const displayName = document.getElementById("displayName");
    const displayAge = document.getElementById("displayAge");
    const displaySex = document.getElementById("displaySex");
    const displayWeight = document.getElementById("displayWeight");
    const displayHeight = document.getElementById("displayHeight");
    const displayBMI = document.getElementById("displayBMI");
  
    // Load saved data from localStorage
    function loadProfile() {
      const profileData = JSON.parse(localStorage.getItem("profileData"));
      if (profileData) {
        nameInput.value = profileData.name;
        ageInput.value = profileData.age;
        sexInput.value = profileData.sex;
        weightInput.value = profileData.weight;
        heightInput.value = profileData.height;
  
        displayName.textContent = profileData.name;
        displayAge.textContent = profileData.age;
        displaySex.textContent = profileData.sex;
        displayWeight.textContent = profileData.weight;
        displayHeight.textContent = profileData.height;
  
        const bmi = calculateBMI(profileData.weight, profileData.height);
        displayBMI.textContent = bmi;
  
        profileForm.classList.add("d-none");
        profileDisplay.classList.remove("d-none");
      }
    }
  
    // Calculate BMI
    function calculateBMI(weight, height) {
      height = height / 100; // Convert height to meters
      return (weight / (height * height)).toFixed(2);
    }
  
    // Save profile data to localStorage
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const profileData = {
        name: nameInput.value,
        age: ageInput.value,
        sex: sexInput.value,
        weight: weightInput.value,
        height: heightInput.value,
      };
  
      // Save profileData to localStorage
      localStorage.setItem("profileData", JSON.stringify(profileData));
  
      // Update profile display
      displayName.textContent = profileData.name;
      displayAge.textContent = profileData.age;
      displaySex.textContent = profileData.sex;
      displayWeight.textContent = profileData.weight;
      displayHeight.textContent = profileData.height;
  
      const bmi = calculateBMI(profileData.weight, profileData.height);
      displayBMI.textContent = bmi;
  
      profileForm.classList.add("d-none");
      profileDisplay.classList.remove("d-none");
    });
  
    // Edit profile button
    editProfileBtn.addEventListener("click", function () {
      profileForm.classList.remove("d-none");
      profileDisplay.classList.add("d-none");
    });
  
    // Load the profile data on page load
    loadProfile();
  });
  