const commitObject = (context, {mutation, payload}) => {
  if (payload && typeof payload === 'object') {
    context.commit(mutation, payload);
  }
};

const commitBoolean = (context, {mutation, payload}) => {
  const payloadIsBool = payload && typeof payload === 'boolean';
  const payloadValueIsBool = payload && typeof payload.value === 'boolean';
  if (payloadIsBool || payloadValueIsBool) {
    context.commit(mutation, payload);
  }
};

export default {
  commitObject,
  commitBoolean,
};
