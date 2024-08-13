from .nodes.dashscope_flux_api import DashScopeFLUXAPI


NODE_CLASS_MAPPINGS = {
    "DashScopeFLUXAPI": DashScopeFLUXAPI,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "DashScopeFLUXAPI": "FLUX API",
}
__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]
