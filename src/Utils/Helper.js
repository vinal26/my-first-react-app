import Moment from 'moment';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const changeDateFormat = (date) => Moment(date).format('MM-DD-YYYY')

export const changeDateFormatYYYY = (date) => Moment(date).format('YYYY-MM-DD')
export const changeDateFormatddmmyyyy = (date) => Moment(date).format('DD-MM-YYYY')

export const changeDateFormatmmddyyyy = (date) => Moment(date).format('MM-DD-YYYY')

export const checkPassword = str => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
};
export const dateSort = (filterdata1) => {
  const result = filterdata1.sort(function (a, b) {
    a = new Date(a.startTime);
    b = new Date(b.startTime);
    return a > b ? -1 : a < b ? 1 : 0;
  })
  return result;

}
export const getFileName = (image) => {
  return `${image.name.replace(/\s+/g, '')}`.split('.')[0] + `__${uuidv4()}`;
}
export const formatAMPM = (date) => {
  // console.log(date, "dateeee")
  const date1 = new Date(date);
  var hours = date1.getHours();
  var minutes = date1.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
export const formatNewDate = (date) => {
  const date1 = date.split("T");
  const date2 = date1[0].split("-");
  return date2[1] + "-" + date2[2] + "-" + date2[0];
}
export const getFileNameFromUrl = (url) => {
  return url.replace(/^.*[\\\/]/, '');
}

export const isEmpty = text => {
  return !(text.toString().trim().length > 0 && text.toString().trim() !== '0');
};

export const isOnlyEmpty = text => {
  return !(text.toString().trim().length > 0);
};

export const getAge = (date) => {
  try {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  } catch (error) {
  }
}


// *** This way you can call *** //
// convertToBase64(file, async function (err, data) {
//   console.log('okkkkkkkkk', data)
//   if (err) {
//     console.log('error', err);
//     /// handle error
//     return;
//   }
// });

export function convertToBase64(file, cb) {
  var reader = new FileReader();
  reader.onload = function (e) {
    cb(null, e.target.result)
  };
  reader.onerror = function (e) {
    cb(e);
  };
  reader.readAsDataURL(file);
}

//validate email
export function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(mail)) {
    return true;
  }
  return false;
}

// Validate Url
export function isValidHttpUrl(url) {
  if (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(url)) {
    return true;
  }
  else {
    return false;
  }
}


// format Date
export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
};


// To resize image
export function resizeImage(base64Str, maxWidth = 400, maxHeight = 350) {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = base64Str
    img.onload = () => {
      let canvas = document.createElement('canvas')
      const MAX_WIDTH = maxWidth
      const MAX_HEIGHT = maxHeight
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL())
    }
  })
}

export const showToastSuccess = (msg) => {
  return toast.success(msg);
}

export const showToastWarning = (msg) => {
  return toast.warning(msg);
}

export const showToastError = (msg) => {
  return toast.error(msg);
}

//functin to paginate array
export const paginate = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color + "65";
}

export function validDate(date) {
  const currentDate = new Date();
  const incomingDate = new Date(date)
  let crr = formatDate(currentDate);
  let incr = formatDate(incomingDate);
  if (crr == incr) {
    return false
  } else {
    let status = currentDate > incomingDate
    return status;
  }
}


export const scrollToTop = () => {
  window.scrollTo(0, 0)
}

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }
  return `T${hours}:${minutes}:00`;
}

export const onStartSession = (link) => {
  link && window.open(link, '_blank');
}

// To check the date is in past or not
export const checkEndDate = (date) => {
  var currentDate = Moment(changeDateFormatYYYY(new Date()), 'YYYY-MM-DD');
  var oldDate = Moment(date, 'YYYY-MM-DD');
  var dDiff2 = oldDate.diff(currentDate);
  if (dDiff2 >= 0) {
    // Date not ended
    return false
  } else {
    // Date ended
    return true
  }
}

// Qualification List
export const qualification_list = [
  { label: 'AAS - Associate of Applied Science in Surgical Technician', value: 'AAS - Associate of Applied Science in Surgical Technician' },
  { label: 'ACRNP - Advanced Registered Nurse Practitioner', value: 'ACRNP - Advanced Registered Nurse Practitioner' },
  { label: 'AD - Associate Degree', value: 'AD - Associate Degree' },
  { label: 'ADN - Associate Degree in Nursing', value: 'ADN - Associate Degree in Nursing' },
  { label: 'ANP - Advanced Nurse Practitioner', value: 'ANP - Advanced Nurse Practitioner' },
  { label: 'APN - Advanced Practice Nurse', value: 'APN - Advanced Practice Nurse' },
  { label: 'APRN - Advanced Practice Registered Nurse', value: 'APRN - Advanced Practice Registered Nurse' },
  { label: 'ARNP - Advanced Registered Nurse Practitioner', value: 'ARNP - Advanced Registered Nurse Practitioner' },
  { label: 'AS - Associate in Science', value: 'AS - Associate in Science' },
  { label: 'AUD - Doctorate in Audiology', value: 'AUD - Doctorate in Audiology' },
  { label: 'BA - Bachelor of Arts', value: 'BA - Bachelor of Arts' },
  { label: 'BA‐PA - Bachelor of Physician Assistant', value: 'BA‐PA - Bachelor of Physician Assistant' },
  { label: 'BDS - Bachelor of Dental Surgery', value: 'BDS - Bachelor of Dental Surgery' },
  { label: 'BPH - Bachelor of Pharmacy', value: 'BPH - Bachelor of Pharmacy' },
  { label: 'BS - Bachelor of Science', value: 'BS - Bachelor of Science' },
  { label: 'BSN - Bachelor of Science in Nursing', value: 'BSN - Bachelor of Science in Nursing' },
  { label: 'BSW - Bachelor in Social Work', value: 'BSW - Bachelor in Social Work' },
  { label: 'CD - Certified Dietician', value: 'CD - Certified Dietician' },
  { label: 'CEAP - Certified Employee Assistance Professional', value: 'CEAP - Certified Employee Assistance Professional' },
  { label: 'CFNP - Certified Family Nurse Practitioner', value: 'CFNP - Certified Family Nurse Practitioner' },
  { label: 'CMT - Certified Massage Therapist', value: 'CMT - Certified Massage Therapist' },
  { label: 'CN - Certified Nutritionist', value: 'CN - Certified Nutritionist' },
  { label: 'CNM - Certified Nurse Midwife', value: 'CNM - Certified Nurse Midwife' },
  { label: 'CNP - Certified Nurse Practitioner', value: 'CNP - Certified Nurse Practitioner' },
  { label: 'CRNA - Certified Registered Nurse Anesthetist', value: 'CRNA - Certified Registered Nurse Anesthetist' },
  { label: 'CRNFA - Certified Registered Nurse First Assistant', value: 'CRNFA - Certified Registered Nurse First Assistant' },
  { label: 'CRNP - Certified Registered Nurse', value: 'CRNP - Certified Registered Nurse' },
  { label: 'CSA - Certified Surgical Assistant', value: 'CSA - Certified Surgical Assistant' },
  { label: 'CST - Certified Surgical Technician', value: 'CST - Certified Surgical Technician' },
  { label: 'DC - Doctor of Chiropractic', value: 'DC - Doctor of Chiropractic' },
  { label: 'DD - Doctorate in Divinity', value: 'DD - Doctorate in Divinity' },
  { label: 'DDS - Doctor of Dental Surgery', value: 'DDS - Doctor of Dental Surgery' },
  { label: 'DIPL - Diploma in Nursing', value: 'DIPL - Diploma in Nursing' },
  { label: 'DMD - Doctor of Dental Medicine', value: 'DMD - Doctor of Dental Medicine' },
  { label: 'DMin - Doctorate of Ministry', value: 'DMin - Doctorate of Ministry' },
  { label: 'DNP - Doctor of Nursing Practice', value: 'DNP - Doctor of Nursing Practice' },
  { label: 'DNS - Doctor of Science Nursing', value: 'DNS - Doctor of Science Nursing' },
  { label: 'DO - Doctor of Osteopathy', value: 'DO - Doctor of Osteopathy' },
  { label: 'DOT - Doctor of Occupational Therapy', value: 'DOT - Doctor of Occupational Therapy' },
  { label: 'DPH - Doctor of Pharmacy', value: 'DPH - Doctor of Pharmacy' },
  { label: 'DPM - Doctor of Podiatric medicine', value: 'DPM - Doctor of Podiatric medicine' },
  { label: 'DPT - Doctor of Physical Therapy', value: 'DPT - Doctor of Physical Therapy' },
  { label: 'DSW - Doctorate in Social Work', value: 'DSW - Doctorate in Social Work' },
  { label: 'EDD - Doctor of Education', value: 'EDD - Doctor of Education' },
  { label: 'EDE - Doctor of Education', value: 'EDE - Doctor of Education' },
  { label: 'EDS - Specialist in Education', value: 'EDS - Specialist in Education' },
  { label: 'FNP - Family Nurse Practitioner', value: 'FNP - Family Nurse Practitioner' },
  { label: 'HAICD - HAI Chemical Dependency Standard', value: 'HAICD - HAI Chemical Dependency Standard' },
  { label: 'LAC - Licensed Acupuncturist', value: 'LAC - Licensed Acupuncturist' },
  { label: 'LM - Licensed Midwife', value: 'LM - Licensed Midwife' },
  { label: 'LMT - Licensed Massage Therapist', value: 'LMT - Licensed Massage Therapist' },
  { label: 'LPN - Licensed Practical Nurse', value: 'LPN - Licensed Practical Nurse' },
  { label: 'LPT - Licensed Physical Therapist', value: 'LPT - Licensed Physical Therapist' },
  { label: 'LSW - Licensed Social Worker', value: 'LSW - Licensed Social Worker' },
  { label: 'MA - Master of Arts', value: 'MA - Master of Arts' },
  { label: 'MAO - Master in Acupuncture and Oriental Medicine', value: 'MAO - Master in Acupuncture and Oriental Medicine' },
  { label: 'MC - Masters in Counseling', value: 'MC - Masters in Counseling' },
  { label: 'MD - Doctor of medicine', value: 'MD - Doctor of medicine' },
  { label: 'MED - Master of Education', value: 'MED - Master of Education' },
  { label: 'MFCC - Marriage/Family/Child Counselor', value: 'MFCC - Marriage/Family/Child Counselor' },
  { label: 'MHS - Master of Health Sciences', value: 'MHS - Master of Health Sciences' },
  { label: 'MMSc - Master of Medical Science', value: 'MMSc - Master of Medical Science' },
  { label: 'MN - Master of Nursing', value: 'MN - Master of Nursing' },
  { label: 'MOT - Master of Occupational Therapy', value: 'MOT - Master of Occupational Therapy' },
  { label: 'MPA - Master of Physician Assistant', value: 'MPA - Master of Physician Assistant' },
  { label: 'MPT - Master of Physical Therapy', value: 'MPT - Master of Physical Therapy' },
  { label: 'MS - Master of Science', value: 'MS - Master of Science' },
  { label: 'MSCP - Master is Science Counseling Psychology', value: 'MSCP - Master is Science Counseling Psychology' },
  { label: 'MSD - Masters in Divinity', value: 'MSD - Masters in Divinity' },
  { label: 'MSN - Master of Science in Nursing', value: 'MSN - Master of Science in Nursing' },
  { label: 'MSO - Master of Science and Oriental Medicine', value: 'MSO - Master of Science and Oriental Medicine' },
  { label: 'MSP - Master of Speech Pathology', value: 'MSP - Master of Speech Pathology' },
  { label: 'MSS - Master of Social Science', value: 'MSS - Master of Social Science' },
  { label: 'MSSA - Master of Science in Social Administration', value: 'MSSA - Master of Science in Social Administration' },
  { label: 'MSSW - Master of Science in Social Work', value: 'MSSW - Master of Science in Social Work' },
  { label: 'MSW - Master of Social Work', value: 'MSW - Master of Social Work' },
  { label: 'ND - Doctor of Naturopathy', value: 'ND - Doctor of Naturopathy' },
  { label: 'NP - Nurse Practitioner', value: 'NP - Nurse Practitioner' },
  { label: 'OD - Doctor of Optometry', value: 'OD - Doctor of Optometry' },
  { label: 'OTD - Other Degree / No Degree', value: 'OTD - Other Degree / No Degree' },
  { label: 'OTR - Occupational Therapist, Registered', value: 'OTR - Occupational Therapist, Registered' },
  { label: "PA‐C - Physician's Assistant, Certified", value: "PA‐C - Physician's Assistant, Certified" },
  { label: "PCCC - Primary Class Christian Science Certificate", value: "PCCC - Primary Class Christian Science Certificate" },
  { label: "PHD - Doctor of Philosophy", value: "PHD - Doctor of Philosophy" },
  { label: "PNA - Primary Nurse Associate", value: "PNA - Primary Nurse Associate" },
  { label: "PSYD - Doctor of Psychology", value: "PSYD - Doctor of Psychology" },
  { label: "PT - Physical Therapist", value: "PT - Physical Therapist" },
  { label: "RD - Registered Dietician", value: "RD - Registered Dietician" },
  { label: "RMT - Registered Massage Therapist", value: "RMT - Registered Massage Therapist" },
  { label: "RN - Registered Nurse", value: "RN - Registered Nurse" },
  { label: "RNP - Registered Nurse Practitioner", value: "RNP - Registered Nurse Practitioner" },
  { label: "RPT - Registered Physical Therapist", value: "RPT - Registered Physical Therapist" },
  { label: "RRT - Registered Respiratory Therapist", value: "RRT - Registered Respiratory Therapist" },
  { label: "SCD - Doctor of Science", value: "SCD - Doctor of Science" },
  { label: "ST - Surgical Technician", value: "ST - Surgical Technician" },
  { label: "TMT - Therapeutic Massage Therapy", value: "TMT - Therapeutic Massage Therapy" },
];
