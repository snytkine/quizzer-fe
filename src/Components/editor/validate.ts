const validate = values => {
  const errors = {}
  if (!values.clubName) {
    //@ts-ignore
    errors.clubName = 'Required'
  }
  if (!values.members || !values.members.length) {
    //@ts-ignore
    errors.members = { _error: 'At least one member must be entered' }
  } else {
    const membersArrayErrors = []
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {}
      if (!member || !member.firstName) {
        //@ts-ignore
        memberErrors.firstName = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (!member || !member.lastName) {
        //@ts-ignore
        memberErrors.lastName = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (member && member.hobbies && member.hobbies.length) {
        const hobbyArrayErrors = []
        member.hobbies.forEach((hobby, hobbyIndex) => {
          if (!hobby || !hobby.length) {
            hobbyArrayErrors[hobbyIndex] = 'Required'
          }
        })
        if (hobbyArrayErrors.length) {
          //@ts-ignore
          memberErrors.hobbies = hobbyArrayErrors
          membersArrayErrors[memberIndex] = memberErrors
        }
        if (member.hobbies.length > 5) {
          //@ts-ignore
          if (!memberErrors.hobbies) {
            // @ts-ignore
            memberErrors.hobbies = []
          }
          //@ts-ignore
          memberErrors.hobbies._error = 'No more than five hobbies allowed'
          membersArrayErrors[memberIndex] = memberErrors
        }
      }
    })
    if (membersArrayErrors.length) {
      //@ts-ignore
      errors.members = membersArrayErrors
    }
  }
  return errors
}

export default validate
