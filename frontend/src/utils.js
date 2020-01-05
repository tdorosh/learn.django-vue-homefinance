//Method to generate array of options for b-form-select
function getTargets(rawTargets) {
  const targets = [{ value: null, text: '--Select item--'}, ]
  if (rawTargets) {
    if (rawTargets.every(object => {
      return 'name' in object
    })) {
          rawTargets.forEach((rawTarget) => {
            const target = {
              value: rawTarget.id,
              text: rawTarget.name
            }
            targets.push(target);
          })
        } else {
            rawTargets.forEach((rawTarget) => {
              const target = {
                value: rawTarget.id,
                text: `${rawTarget.title}, ${rawTarget.amount} ${rawTarget.currency}`
              }
              targets.push(target);
          })
      }
  }
  return targets;
}

function getDate(date) {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  return new Date(date).toLocaleDateString(navigator.language || navigator.userLanguage, options)
}

function convertDateToISOString(datetimeString) {
  if (typeof datetimeString === "object") {
    return datetimeString.toISOString();
  } else if (typeof datetimeString === "string") {
    let datetimeArray = datetimeString.split(', ');
    let date = datetimeArray[0];
    let time = datetimeArray[1];
    const newDate = date.split('.').reverse().join('-');
    return `${newDate}T${time}`;
  }
}

export {
  getTargets, getDate, convertDateToISOString,
};