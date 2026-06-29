function validateNavigationNodes(nodes, errors, path = 'navigation') {
  if (!Array.isArray(nodes)) {
    errors.push(`\`${path}\` 必须是数组。`);
    return;
  }

  nodes.forEach((node, index) => {
    const currentPath = `${path}[${index}]`;

    if (!node || typeof node !== 'object' || Array.isArray(node)) {
      errors.push(`${currentPath} 必须是对象。`);
      return;
    }

    if (!node.key) {
      errors.push(`${currentPath}.key 缺失。`);
    }
    if (!node.title) {
      errors.push(`${currentPath}.title 缺失。`);
    }
    if (node.children !== undefined) {
      validateNavigationNodes(node.children, errors, `${currentPath}.children`);
    }
  });
}

export function validateMethodologyConfig(config) {
  const errors = [];

  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return ['根节点必须是对象。'];
  }

  if (!config.meta || typeof config.meta !== 'object' || Array.isArray(config.meta)) {
    errors.push('缺少 `meta` 对象。');
  } else {
    if (!config.meta.key) {
      errors.push('`meta.key` 缺失。');
    }
    if (!config.meta.title) {
      errors.push('`meta.title` 缺失。');
    }
    if (!config.meta.version) {
      errors.push('`meta.version` 缺失。');
    }
  }

  validateNavigationNodes(config.navigation, errors);

  if (!config.pages || typeof config.pages !== 'object' || Array.isArray(config.pages)) {
    errors.push('`pages` 必须是对象。');
  }

  if (!config.fields || typeof config.fields !== 'object' || Array.isArray(config.fields)) {
    errors.push('`fields` 必须是对象。');
  }

  if (config.pages && typeof config.pages === 'object' && !Array.isArray(config.pages)) {
    Object.entries(config.pages).forEach(([pageKey, page]) => {
      if (!page || typeof page !== 'object' || Array.isArray(page)) {
        errors.push(`pages.${pageKey} 必须是对象。`);
        return;
      }

      if (!page.type) {
        errors.push(`pages.${pageKey}.type 缺失。`);
      }
      if (!page.title) {
        errors.push(`pages.${pageKey}.title 缺失。`);
      }

      if ((page.type === 'record-collection' || page.type === 'standard-record') && !Array.isArray(page.fields)) {
        errors.push(`pages.${pageKey}.fields 必须是数组。`);
      }

      if (page.sections !== undefined && !Array.isArray(page.sections)) {
        errors.push(`pages.${pageKey}.sections 必须是数组。`);
      }
    });
  }

  if (config.fields && typeof config.fields === 'object' && !Array.isArray(config.fields)) {
    Object.entries(config.fields).forEach(([fieldKey, field]) => {
      if (!field || typeof field !== 'object' || Array.isArray(field)) {
        errors.push(`fields.${fieldKey} 必须是对象。`);
        return;
      }

      if (!field.label) {
        errors.push(`fields.${fieldKey}.label 缺失。`);
      }
      if (!field.type) {
        errors.push(`fields.${fieldKey}.type 缺失。`);
      }
    });
  }

  if (config.outputs !== undefined && (typeof config.outputs !== 'object' || Array.isArray(config.outputs))) {
    errors.push('`outputs` 必须是对象。');
  }

  if (config.cases !== undefined && !Array.isArray(config.cases)) {
    errors.push('`cases` 必须是数组。');
  }

  return errors;
}
