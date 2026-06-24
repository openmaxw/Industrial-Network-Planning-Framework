export function validateMethodologyConfig(config) {
  const errors = [];

  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return ['根节点必须是对象。'];
  }

  if (!config.meta || typeof config.meta !== 'object') {
    errors.push('缺少 `meta` 对象。');
  } else {
    if (!config.meta.key) {
      errors.push('`meta.key` 缺失。');
    }
    if (!config.meta.title) {
      errors.push('`meta.title` 缺失。');
    }
  }

  if (!Array.isArray(config.navigation)) {
    errors.push('`navigation` 必须是数组。');
  }

  if (!config.pages || typeof config.pages !== 'object' || Array.isArray(config.pages)) {
    errors.push('`pages` 必须是对象。');
  }

  if (!config.fields || typeof config.fields !== 'object' || Array.isArray(config.fields)) {
    errors.push('`fields` 必须是对象。');
  }

  if (config.navigation && Array.isArray(config.navigation)) {
    config.navigation.forEach((node, index) => {
      if (!node.key) {
        errors.push(`navigation[${index}] 缺少 key。`);
      }
      if (!node.title) {
        errors.push(`navigation[${index}] 缺少 title。`);
      }
    });
  }

  if (config.pages && typeof config.pages === 'object' && !Array.isArray(config.pages)) {
    Object.entries(config.pages).forEach(([pageKey, page]) => {
      if (!page.type) {
        errors.push(`pages.${pageKey}.type 缺失。`);
      }
      if (!page.title) {
        errors.push(`pages.${pageKey}.title 缺失。`);
      }
    });
  }

  if (config.fields && typeof config.fields === 'object' && !Array.isArray(config.fields)) {
    Object.entries(config.fields).forEach(([fieldKey, field]) => {
      if (!field.label) {
        errors.push(`fields.${fieldKey}.label 缺失。`);
      }
      if (!field.type) {
        errors.push(`fields.${fieldKey}.type 缺失。`);
      }
    });
  }

  return errors;
}
