 export const BASE_URL = "http://192.168.8.205:8091/api";
//  export const BASE_URL = "http://localhost:8080/api";

export async function getLastUpdatedTime() {
  try {
    let url = `${BASE_URL}/lastUpdatedTime`;
    return await fetch(url).then((response) => response.text());
  } catch (error) {
    return;
  }
}

export async function getProjectDetails(project, module) {
  try {
    var url = `${BASE_URL}/projectDetails/${project}/${module}`;
    if (module === "all")
      url = `${BASE_URL}/projectDetails/${project}/connector`;

    return await fetch(url).then((res) => {
      return res.json();
    });
  } catch (error) {
    return;
  }
}

export async function getAllProjectDetails() {
  try {
    let url = `${BASE_URL}/allProjectDetails`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}

export async function getServer() {
  try {
    let url = `${BASE_URL}/server`;
    return await fetch(url).then((response) => response.text());
  } catch (error) {
    return;
  }
}
export async function getRamUtilization() {
  try {
    let url = `${BASE_URL}/ramUtilization`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}

export async function getCpuUtilizaton() {
  try {
    let url = `${BASE_URL}/cpuUtilization`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}

export async function getBlcCount(project) {
  try {
    let url = `${BASE_URL}/blcCount`;
    if (project != "all") url = `${BASE_URL}/blcCount/${project}`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}
export async function getLbtCount(project) {
  try {
    let url = `${BASE_URL}/lbtCount`;
    if (project != "all") url = `${BASE_URL}/lbtCount/${project}`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}
export async function getTableCount(project) {
  try {
    let url = `${BASE_URL}/tableCount`;
    if (project != "all") url = `${BASE_URL}/tableCount/${project}`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}
export async function getConnectorCount(project) {
  try {
    let url = `${BASE_URL}/connectorCount`;
    if (project != "all") url = `${BASE_URL}/connectorCount/${project}`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}

export async function getTotalProject() {
  try {
    let url = `${BASE_URL}/projectCount`;
    return await fetch(url).then((response) => response.text());
  } catch (error) {
    return;
  }
}
export async function getTotalUser() {
  try {
    let url = `${BASE_URL}/userCount`;
    return await fetch(url).then((response) => response.text());
  } catch (error) {
    return;
  }
}

export async function getProjectModuleDetail(project, module) {
  try {
    let url = `${BASE_URL}/projectDetails/${project}/${module}`;
    if (module === "all")
      url = `${BASE_URL}/projectDetails/${project}/connector`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}

export async function getAllProjectComponentDetails(module) {
  try {
    let url = `${BASE_URL}/allProjectComponentDetails/connector`;
    if (module != "all")
      url = `${BASE_URL}/allProjectComponentDetails/${module}`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}
export async function getComponentLagData(project, component) {
  try {
    let url = `${BASE_URL}/componentLagData/${project}/${component}`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}
export async function getProjectDetailsModule(
  projectName,
  project,
  module,
  mapState
) {
  try {
    var url = `${BASE_URL}/${mapState[projectName]}/${module}`;
    if (project === "all")
      url = `${BASE_URL}/allProjectComponentDetails/${module}`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}

export async function getSqlConnections() {
  try {
    let url = `${BASE_URL}/sqlThreads`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}

export async function getSchemaToProject() {
  try {
    let url = `${BASE_URL}/schemaToProject`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}
export async function getProjectConfig() {
  try {
    let url = `${BASE_URL}/projectConfig`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}
export async function getProjectDropdown() {
  try {
    let url = `${BASE_URL}/projectDropdown`;
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    return;
  }
}
